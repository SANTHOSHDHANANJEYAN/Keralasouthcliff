import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";

interface IBooking {
  name: string;
  email: string;
  phone: string;
  guests: number;
  villa: string;
  checkIn: string;
  checkOut: string;
  message?: string | null; // ✅ Allow null also
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: IBooking = await req.json();

    const booking = new Booking({
      ...body,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
    });

    await booking.save();

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
