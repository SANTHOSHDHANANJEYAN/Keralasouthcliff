import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";

// Define booking type
interface IBooking {
  name: string;
  email: string;
  phone: string;
  guests: number;
  villa: string;
  checkIn: string;
  checkOut: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: IBooking = await req.json();

    // Create a new booking
    const booking = new Booking({
      ...body,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
    });

    await booking.save();

    // Convert mongoose doc to plain object + convert Date → string
    const bookingData: IBooking = {
      ...booking.toObject(),
      checkIn:
        booking.checkIn instanceof Date
          ? booking.checkIn.toISOString()
          : (booking.checkIn as unknown as string),
      checkOut:
        booking.checkOut instanceof Date
          ? booking.checkOut.toISOString()
          : (booking.checkOut as unknown as string),
    };

    // Send emails
    await Promise.all([
      sendOwnerNotification(bookingData),
      sendGuestConfirmation(bookingData),
    ]);

    return NextResponse.json(
      { message: "Booking successful!", booking: bookingData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "Booking failed", error },
      { status: 500 }
    );
  }
}
