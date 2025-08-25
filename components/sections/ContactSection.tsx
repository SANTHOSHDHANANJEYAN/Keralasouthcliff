"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// ✅ Dynamically import PhoneInput
const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });
import "react-phone-input-2/lib/style.css";

export default function ContactPage() {
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

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ Track success

  const [bookings, setBookings] = useState<
    { villa: string; checkIn: string; checkOut: string }[]
  >([]);

  // ✅ Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("villaBookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  // ✅ Save bookings
  useEffect(() => {
    localStorage.setItem("villaBookings", JSON.stringify(bookings));
  }, [bookings]);

  // ✅ Handle input
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    },
    []
  );

  // ✅ Overlap check
  const isDateOverlap = (
    checkIn1: string,
    checkOut1: string,
    checkIn2: string,
    checkOut2: string
  ) => {
    return (
      new Date(checkIn1) <= new Date(checkOut2) &&
      new Date(checkOut1) >= new Date(checkIn2)
    );
  };

  // ✅ Submit form
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

    // 🔴 Conflict check
    const conflict = bookings.find(
      (b) =>
        b.villa === formData.villa &&
        isDateOverlap(b.checkIn, b.checkOut, formData.checkIn, formData.checkOut)
    );

    if (conflict) {
      toast.error(
        `${formData.villa} is already booked from ${conflict.checkIn} to ${conflict.checkOut} ❌`,
        { duration: 5000, position: "top-center" }
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xovnaykg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: "New Villa Booking Request",
          _autoresponse:
            "Thank you for booking with South Cliff Villas! ✅ Your request has been received. We will contact you shortly.",
        }),
      });

      if (res.ok) {
        toast.success("Booking confirmed! ✅", {
          duration: 4000,
          position: "top-center",
        });

        setBookings((prev) => [
          ...prev,
          { villa: formData.villa, checkIn: formData.checkIn, checkOut: formData.checkOut },
        ]);

        setSubmitted(true); // ✅ Show thank-you message
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
        toast.error("Booking failed. Try again!", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Something went wrong.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Info sections
  const contactInfo = [
    { icon: Phone, title: "Phone", value: "+91 79941 44472", description: "Available 24/7" },
    { icon: Mail, title: "Email", value: "contact.asteya@gmail.com", description: "Reach us anytime" },
    { icon: MapPin, title: "Location", value: "South Cliff, Varkala", description: "Kerala, India 695141" },
    { icon: Clock, title: "Response Time", value: "Quick", description: "We respond immediately" },
  ];

  const bookingInfo = [
    { label: "Room Rate", value: "PRICE ON REQUEST" },
    { label: "Minimum Stay", value: "1 DAY" },
    { label: "Check-in / Check-out", value: "3:00 PM / 12:00 PM" },
    { label: "Advance Booking", value: "50% advance required" },
    { label: "Cancellation", value: "Free up to 48 hours" },
    { label: "Maximum Guests", value: "Maximum 4 guests (For more than 4 persons, please inquire)" },
    { label: "Payment Methods", value: "Cash / UPI / Bank Transfer" },
    { label: "Confirmation", value: "Email / WhatsApp" },
  ];

  return (
    <section className="relative bg-white py-24 text-gray-900">
      <Toaster />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Experience luxury at Kerala South Cliff Beach View Villas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ✅ Show thank you after submit */}
          <div className="w-full rounded-xl p-8 bg-white shadow-lg border border-gray-200">
            {submitted ? (
              <div className="text-center py-12">
                <h3 className="text-3xl font-bold mb-4 text-green-600">🎉 Thank You!</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Dear <span className="font-semibold">{formData.name || "Guest"}</span>,<br />
                  Thank you for applying! We’ve received your booking request.<br />
                  Our team will contact you shortly via Email/WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-800 transition-colors"
                >
                  Book Another Stay
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors[field] ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-black`}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <PhoneInput
                    country={"in"}
                    value={formData.phone}
                    onChange={(phone) => {
                      setFormData((prev) => ({ ...prev, phone }));
                      setErrors((prev) => ({ ...prev, phone: false }));
                    }}
                    inputClass={`!w-full !p-3 !rounded-md !border ${
                      errors.phone ? "!border-red-500" : "!border-gray-300"
                    } !focus:ring-2 !focus:ring-black`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">Phone is required</p>
                  )}
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["checkIn", "checkOut"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="date"
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors[field] ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-black`}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <input
                      type="number"
                      name="guests"
                      min={1}
                      max={4}
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Villa Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Villa
                  </label>
                  <select
                    name="villa"
                    value={formData.villa}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.villa ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-black`}
                  >
                    <option value="">Choose an option</option>
                    <option value="Top Floor">Top Floor</option>
                    <option value="Ground Floor">Ground Floor</option>
                    <option value="Entire Villa">Entire Villa</option>
                  </select>
                  {errors.villa && (
                    <p className="text-red-500 text-xs mt-1">Please select a villa</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={180}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                  />
                  <span className="text-xs text-gray-400 float-right">
                    {formData.message.length}/180
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-black text-white py-3 px-6 rounded-md transition-colors ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-green-800"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Enquire Now"}
                </button>
              </form>
            )}
          </div>

          {/* Booking Info */}
          <Card className="bg-gray-100 shadow-lg rounded-3xl p-10 flex flex-col justify-between">
            <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
            <div className="space-y-4">
              {bookingInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-black mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
