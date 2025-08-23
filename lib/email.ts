// /lib/email.ts
import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_TO,
  NEXT_PUBLIC_SITE_URL,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM || !EMAIL_TO) {
  console.warn("Email environment variables are missing. Email sending will fail.");
}

export function getTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendOwnerNotification(booking: {
  name: string; email: string; phone: string; guests: number; villa: string;
  checkIn: string; checkOut: string; message?: string;
}) {
  const transporter = getTransport();

  const html = `
    <h2>New Booking Confirmed</h2>
    <p><b>Name:</b> ${booking.name}</p>
    <p><b>Email:</b> ${booking.email}</p>
    <p><b>Phone:</b> ${booking.phone}</p>
    <p><b>Guests:</b> ${booking.guests}</p>
    <p><b>Villa:</b> ${booking.villa}</p>
    <p><b>Check-in:</b> ${booking.checkIn}</p>
    <p><b>Check-out:</b> ${booking.checkOut}</p>
    ${booking.message ? `<p><b>Message:</b> ${booking.message}</p>` : ""}
    <hr />
    <p>View in dashboard (if any): ${NEXT_PUBLIC_SITE_URL || ""}</p>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: `New Booking • ${booking.villa} • ${booking.checkIn} → ${booking.checkOut}`,
    html,
  });
}

export async function sendGuestConfirmation(booking: {
  name: string; email: string; villa: string; checkIn: string; checkOut: string; guests: number;
}) {
  const transporter = getTransport();

  const html = `
    <h2>Booking Confirmed 🎉</h2>
    <p>Hi ${booking.name},</p>
    <p>Your stay at <b>Kerala South Cliff Beach View Villas</b> is confirmed.</p>
    <ul>
      <li><b>Villa:</b> ${booking.villa}</li>
      <li><b>Guests:</b> ${booking.guests}</li>
      <li><b>Check-in:</b> ${booking.checkIn}</li>
      <li><b>Check-out:</b> ${booking.checkOut}</li>
    </ul>
    <p>We look forward to hosting you. If you need any help, just reply to this email.</p>
    <p>Warm regards,<br/>South Cliff Villas</p>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM!,
    to: booking.email,
    subject: "Your Booking is Confirmed – Kerala South Cliff Villas",
    html,
  });
}
