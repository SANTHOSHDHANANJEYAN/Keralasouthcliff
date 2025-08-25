import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://santokum9206:FAwgINhgtJeIClWi@astya.db33am7.mongodb.net/?retryWrites=true&w=majority&appName=astya";
const client = new MongoClient(uri);
const dbName = "astya";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, checkIn, checkOut, villa, guests, message } = data;

    await client.connect();
    const db = client.db(dbName);
    const bookings = db.collection("bookings");

    // ✅ check if villa already booked for overlapping dates
    const existing = await bookings.findOne({
      villa, // only block if same villa is booked
      $or: [
        {
          checkIn: { $lte: checkOut },
          checkOut: { $gte: checkIn },
        },
      ],
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: `${villa} is already booked for selected dates.` },
        { status: 400 }
      );
    }

    // ✅ Insert booking if available
    await bookings.insertOne({
      name,
      email,
      phone,
      checkIn,
      checkOut,
      villa,
      guests,
      message,
      createdAt: new Date(),
    });

    // ✅ Send mail using Formspree (replace with your form ID)
    await fetch("https://formspree.io/f/xovnaykg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        checkIn,
        checkOut,
        villa,
        guests,
        message,
      }),
    });

    return NextResponse.json(
      { success: true, message: "Booking confirmed." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
