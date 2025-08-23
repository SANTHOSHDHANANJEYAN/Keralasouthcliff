// /app/api/book/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";

// Normalize to YYYY-MM-DD (IST) safely on server
function toLocalDateYYYYMMDD(dateStr: string) {
  // Expecting input like "2025-08-23"
  // Do minimal validation
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

// Check if two date ranges [aStart, aEnd) and [bStart, bEnd) overlap
function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic server-side validation
    const required = ["name","email","phone","checkIn","checkOut","guests","villa"];
    for (const f of required) {
      if (!body[f] && body[f] !== 0) {
        return NextResponse.json({ ok: false, error: `Missing field: ${f}` }, { status: 400 });
      }
    }

    const checkIn = toLocalDateYYYYMMDD(body.checkIn);
    const checkOut = toLocalDateYYYYMMDD(body.checkOut);
    if (!checkIn || !checkOut) {
      return NextResponse.json({ ok: false, error: "Invalid dates." }, { status: 400 });
    }
    if (!(checkIn < checkOut)) {
      return NextResponse.json({ ok: false, error: "Check-out must be after check-in." }, { status: 400 });
    }

    // Optional caps
    const guests = Number(body.guests);
    if (Number.isNaN(guests) || guests < 1 || guests > 8) {
      return NextResponse.json({ ok: false, error: "Guests must be between 1 and 8." }, { status: 400 });
    }

    await dbConnect();

    // 1) Prevent double-booking by checking overlapping bookings for the same villa.
    // We fetch any booking where (existing.checkIn < requested.checkOut) AND (requested.checkIn < existing.checkOut)
    const existing = await Booking.find({
      villa: body.villa,
      $expr: {
        $and: [
          { $lt: ["$checkIn", checkOut] },
          { $lt: [checkIn, "$checkOut"] },
        ],
      },
    }).lean();

    if (existing.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Selected dates are unavailable for this villa. Please choose different dates or another villa.",
          code: "DATE_UNAVAILABLE",
        },
        { status: 409 }
      );
    }

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
      await Promise.all([
        sendOwnerNotification(booking),
        sendGuestConfirmation(booking),
      ]);
    } catch (e) {
      console.error("Email send failed:", e);
      // Continue – booking already saved
    }

    return NextResponse.json({ ok: true, bookingId: booking._id.toString() }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
