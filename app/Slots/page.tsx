'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';


export default function BookingPage() {
  const today = dayjs();
  const router = useRouter();

  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedDates = localStorage.getItem('bookedDates');
    if (savedDates) {
      setBookedDates(JSON.parse(savedDates));
    }
  }, []);

  useEffect(() => {
    if (bookedDates.length) {
      localStorage.setItem('bookedDates', JSON.stringify(bookedDates));
    }
  }, [bookedDates]);

  const handleBooking = () => {
    if (!selectedDate || !email) return;

    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

    if (bookedDates.includes(formattedDate)) {
      setMessage('❌ This date is already booked!');
      return;
    }

    const subject = encodeURIComponent(`Booking Confirmation - ${formattedDate}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to confirm a booking for the date: ${formattedDate}.\n\nThank you.\n\nEmail: ${email}`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=contact.asteya@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailLink, '_blank');

    setBookedDates([...bookedDates, formattedDate]);
    setMessage(`📩 Gmail opened. Please confirm and send your booking manually.`);
  };

  const isDateBooked = (date: Date) =>
    bookedDates.includes(dayjs(date).format('YYYY-MM-DD'));

  const getDayClass = (date: Date) => {
    const formatted = dayjs(date).format('YYYY-MM-DD');
    if (bookedDates.includes(formatted)) return 'booked-day';
    if (dayjs(date).isSame(dayjs(), 'day')) return 'today-highlight';
    return '';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/astega/32.png"
        alt="Booking Background"
        layout="fill"
        objectFit="cover"
        priority
        className="z-[-1]"
      />

      <div className="w-full max-w-md bg-white/90 text-black shadow-2xl rounded-xl p-6 sm:p-8 z-10">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">🛏️ Book Your Villa</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-black/30 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-black transition-all"
          required
        />

        <div className="mb-6">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={today.toDate()}
            maxDate={today.add(60, 'day').toDate()}
            filterDate={(date) => !isDateBooked(date)}
            placeholderText="Select a booking date"
            dateFormat="yyyy-MM-dd"
            dayClassName={getDayClass}
            className="w-full px-4 py-3 border border-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
            inline
          />
        </div>

        <button
          onClick={handleBooking}
          disabled={!selectedDate || !email}
          className="w-full py-3 mb-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black border border-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>

        <button
          onClick={() => router.push('/#')}
          className="w-full py-3 bg-white text-black border border-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all"
        >
          ⬅️ Back to Home
        </button>

        {message && (
          <div className="mt-4 text-center text-sm text-black">{message}</div>
        )}
      </div>
    </section>
  );
}
