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
    checkIn: "",
    checkOut: "",
    guests: 1,
    villa: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // ✅ handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ["name", "email", "phone", "checkIn", "checkOut", "villa"];
    const newErrors: { [key: string]: boolean } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(result.message || "Booking confirmed ✅");
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: 1,
          villa: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Booking failed ❌");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Stay</h2>
        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="p-3 border rounded"
                required
              />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="p-3 border rounded"
                required
              />
            </div>
            <select
              name="villa"
              value={formData.villa}
              onChange={handleChange}
              className="p-3 border rounded"
              required
            >
              <option value="">Select Villa</option>
              <option value="Top Floor">Top Floor</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="Entire Floor">Entire Floor</option>
            </select>
            <textarea
              name="message"
              placeholder="Special requests (optional)"
              value={formData.message}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
}
