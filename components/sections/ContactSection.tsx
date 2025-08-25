"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    villa: "",
    message: "",
  });

  const [bookings, setBookings] = useState<{ date: string; villa: string }[]>(
    []
  );

  // ✅ Handles input, textarea, and select
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if date + villa already booked
    const isBooked = bookings.some(
      (b) => b.date === formData.date && b.villa === formData.villa
    );

    if (isBooked) {
      toast.error(`This ${formData.villa} is already booked on this date.`);
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xovnaykg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Booking successful! ✅");
        setBookings([...bookings, { date: formData.date, villa: formData.villa }]);

        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          villa: "",
          message: "",
        });
      } else {
        toast.error("Failed to submit booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Book Your Stay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
              <select
                name="villa"
                value={formData.villa}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              >
                <option value="">Select Room</option>
                <option value="Top Floor">Top Floor</option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="Entire Floor">Entire Floor</option>
              </select>
              <textarea
                name="message"
                placeholder="Additional Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
              >
                Book Now
              </button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="text-green-600" />
              <p>info@keralasouthcliff.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-green-600" />
              <p>+91 6374310315</p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-green-600" />
              <p>South Cliff, Kerala, India</p>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="text-green-600" />
              <p>Check-in: 2:00 PM | Check-out: 11:00 AM</p>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="text-green-600" />
              <p>100% Secure Booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
