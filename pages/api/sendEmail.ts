import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { selectedDate, userEmail } = req.body;

  if (!selectedDate || !userEmail) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        
      },
    });

    await transporter.sendMail({
      from: `"Asteya Villa Booking" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Confirmation - ${selectedDate}`,
      html: `
        <h2>Booking Confirmed</h2>
        <p>Thank you for booking with Asteya Villa.</p>
        <p>Your booking date: <strong>${selectedDate}</strong></p>
      `,
    });

    return res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
