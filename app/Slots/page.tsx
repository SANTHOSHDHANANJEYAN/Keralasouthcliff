"use client";

import { useState } from "react";
import dayjs from "dayjs";

export default function BookingPage() {
  const today = dayjs();

  // Generate next 14 days for demo
  const days = Array.from({ length: 14 }, (_, i) => today.add(i, "day"));

  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleBooking = () => {
    if (!selectedDate) return;

    if (bookedDates.includes(selectedDate)) {
      setMessage("❌ This date is already booked!");
      return;
    }

    setBookedDates([...bookedDates, selectedDate]);
    setMessage(`✅ Booked successfully for ${selectedDate}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Room Booking</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {days.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const isBooked = bookedDates.includes(dateStr);

          return (
            <button
              key={dateStr}
              disabled={isBooked}
              onClick={() => setSelectedDate(dateStr)}
              className={`p-4 rounded-lg border shadow text-center transition 
                ${
                  isBooked
                    ? "bg-red-300 text-white cursor-not-allowed"
                    : selectedDate === dateStr
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
            >
              <p className="font-semibold">{day.format("MMM DD")}</p>
              {isBooked && <p className="text-xs">Booked</p>}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={handleBooking}
          disabled={!selectedDate}
          className="px-6 py-3 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>

      {message && (
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
