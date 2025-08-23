import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // 1) Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.checkIn ||
      !body.checkOut ||
      !body.guests ||
      !body.villa
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const checkIn = new Date(body.checkIn);
    const checkOut = new Date(body.checkOut);
    const guests = parseInt(body.guests, 10);

    // 2) Save booking
    const booking = await Booking.create({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      guests,
      villa: body.villa,
      checkIn,
      checkOut,
      message: (body.message || "").trim(),
      status: "confirmed",
    });

    // 3) Send emails (best-effort; don't fail booking if email fails)
    try {
      const bookingData = booking.toObject(); // plain object (no mongoose metadata)
      await Promise.all([
        sendOwnerNotification(bookingData),
        sendGuestConfirmation(bookingData),
      ]);
    } catch (e) {
      console.error("Email send failed:", e);
      // Continue – booking already saved
    }

    // 4) Success response
    return NextResponse.json(
      { message: "Booking confirmed", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
