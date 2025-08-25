import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://santokum9206:FAwgINhgtJeIClWi@astya.db33am7.mongodb.net/?retryWrites=true&w=majority&appName=astya";
const client = new MongoClient(uri);
const dbName = "astya";

// your real Formspree endpoint from https://formspree.io/forms
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovnaykg";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, checkIn, checkOut, villa, guests, message } = data;

    await client.connect();
    const db = client.db(dbName);
    const bookings = db.collection("bookings");

    // ✅ prevent overlapping booking for same villa
    const existing = await bookings.findOne({
      villa,
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

    // ✅ save booking in MongoDB
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

    // ✅ send to Formspree using form-urlencoded
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);
    formData.append("villa", villa);
    formData.append("guests", guests.toString());
    formData.append("message", message);

    const formRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData,
    });

    if (!formRes.ok) {
      const errorData = await formRes.json().catch(() => ({}));
      console.error("Formspree error:", errorData);
      return NextResponse.json(
        { success: false, message: "Booking saved, but email failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Booking confirmed & email sent via Formspree." },
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
