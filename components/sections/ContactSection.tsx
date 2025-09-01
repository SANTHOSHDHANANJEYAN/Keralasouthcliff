"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";

// ✅ Safe dynamic import
const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
});
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

  const [errors, setErrors] = useState<{ [key: string]: boolean | string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<
    { villa: string; checkIn: string; checkOut: string }[]
  >([]);

  // ✅ Load bookings safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("villaBookings");
      if (saved) {
        try {
          setBookings(JSON.parse(saved));
        } catch {
          setBookings([]);
        }
      }
    }
  }, []);

  // ✅ Save bookings safely
  useEffect(() => {
    if (typeof window !== "undefined" && bookings.length > 0) {
      localStorage.setItem("villaBookings", JSON.stringify(bookings));
    }
  }, [bookings]);

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

  const isDateOverlap = (
    checkIn1: string,
    checkOut1: string,
    checkIn2: string,
    checkOut2: string
  ) => {
    if (!checkIn1 || !checkOut1 || !checkIn2 || !checkOut2) return false;
    const start1 = new Date(checkIn1);
    const end1 = new Date(checkOut1);
    const start2 = new Date(checkIn2);
    const end2 = new Date(checkOut2);
    return start1 <= end2 && end1 >= start2;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = [
      "name",
      "email",
      "phone",
      "checkIn",
      "checkOut",
      "villa",
    ];
    const newErrors: { [key: string]: boolean | string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkInDate >= checkOutDate) {
        newErrors.checkOut = "Check-out must be after check-in";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const conflict = bookings.find(
      (b) =>
        b.villa === formData.villa &&
        isDateOverlap(
          b.checkIn,
          b.checkOut,
          formData.checkIn,
          formData.checkOut
        )
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
      const res = await fetch("https://formspree.io/f/xandydqw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: "New Villa Booking Request",
        }),
      });

      if (res.ok) {
        toast.success("Booking confirmed! ✅", {
          duration: 4000,
          position: "top-center",
        });

        setBookings((prev) => [
          ...prev,
          {
            villa: formData.villa,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
          },
        ]);

        // ✅ Safe WhatsApp link
        if (typeof window !== "undefined") {
          const whatsappNumber = "917994144472";
          const whatsappMessage = `🛎️ New Booking Request
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Villa: ${formData.villa}
Guests: ${formData.guests}
Check-In: ${formData.checkIn}
Check-Out: ${formData.checkOut}
Message: ${formData.message}`;

          window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`,
            "_blank"
          );
        }

        // ✅ Reset form
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
        toast.error("Booking failed. Try again!");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-white py-24 text-gray-900">
          <Toaster />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Book Your Stay
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Experience luxury at Kerala South Cliff Beach View Villas. Fill
                out the form below or reach out directly.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="w-full rounded-xl p-8 bg-white shadow-lg border border-gray-200">
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
                            errors[field]
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:ring-2 focus:ring-black`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <PhoneInput
                      country="us"
                      value={formData.phone}
                      onChange={(phone) => {
                        const fixedPhone = phone.startsWith("+")
                          ? phone
                          : `+${phone}`;
                        setFormData((prev) => ({
                          ...prev,
                          phone: fixedPhone,
                        }));
                        setErrors((prev) => ({ ...prev, phone: false }));
                      }}
                      enableAreaCodes={true}
                      inputClass="!w-full !p-3 !pl-12 !text-base !border !border-gray-300 !rounded-md focus:!ring-2 focus:!ring-black"
                      buttonClass="!border-gray-300 !bg-white"
                      dropdownClass="!text-base"
                      placeholder="+1 202-555-0123"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        Phone is required
                      </p>
                    )}
                  </div>

                  {/* Dates + Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["checkIn", "checkOut"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="date"
                          name={field}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          className={`w-full p-3 border ${
                            errors[field]
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:ring-2 focus:ring-black`}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
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

                  {/* Villa */}
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
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={180}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-black text-white py-3 px-6 rounded-md transition-colors ${
                      isSubmitting
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Enquire Now"}
                  </button>
                </form>
              </div>

              {/* Booking Info */}
              <Card className="bg-gray-100 shadow-lg rounded-3xl p-10">
                <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
                {[
                  { label: "Room Rate", value: "Price on Request" },
                  { label: "Minimum Stay", value: "1 Day" },
                  { label: "Check-in / Check-out", value: "3:00 PM / 12:00 PM" },
                  { label: "Advance Booking", value: "50% advance required" },
                  { label: "Cancellation", value: "Free up to 48 hours" },
                  { label: "Maximum Guests", value: "Maximum 4 guests (ask for more)" },
                  { label: "Payment Methods", value: "Cash / UPI / Bank Transfer" },
                  { label: "Confirmation", value: "Email / WhatsApp" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <CheckCircle className="text-black mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
