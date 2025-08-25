"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const bookedDates: string[] = [
  "2025-08-28",
  "2025-08-30",
  "2025-09-01",
]; // <-- add booked dates here (YYYY-MM-DD)

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookedDates.includes(formData.date)) {
      toast.error("This date is already booked! Please choose another one.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", date: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Contact & Booking
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <Card className="p-6 flex items-center space-x-4">
              <Mail className="text-blue-600" />
              <span>info@example.com</span>
            </Card>
            <Card className="p-6 flex items-center space-x-4">
              <Phone className="text-blue-600" />
              <span>+91 98765 43210</span>
            </Card>
            <Card className="p-6 flex items-center space-x-4">
              <MapPin className="text-blue-600" />
              <span>South Cliff, Varkala, Kerala</span>
            </Card>
            <Card className="p-6 flex items-center space-x-4">
              <Calendar className="text-blue-600" />
              <span>Check availability before booking</span>
            </Card>
          </div>

          {/* Booking Form */}
          <Card className="p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
                min={new Date().toISOString().split("T")[0]}
              />
              {formData.date && bookedDates.includes(formData.date) && (
                <p className="text-red-600 text-sm mt-1">
                  ❌ This date is already booked.
                </p>
              )}
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg h-28"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <CheckCircle />
                <span>Send Message</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Legend for booked dates */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <strong>Booked Dates:</strong>{" "}
            {bookedDates.length > 0 ? bookedDates.join(", ") : "None"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
