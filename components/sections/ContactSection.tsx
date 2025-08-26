"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// ✅ Import Header & Footer
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ✅ Dynamically import PhoneInput
const PhoneInput = dynamic(
  () => import("react-phone-input-2").then((mod) => mod.default),
  { ssr: false }
);
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

  // ✅ Bookings stored persistently
  const [bookings, setBookings] = useState<
    { villa: string; checkIn: string; checkOut: string }[]
  >([]);

  // ✅ Load saved bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem("villaBookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  // ✅ Save bookings whenever updated
  useEffect(() => {
    localStorage.setItem("villaBookings", JSON.stringify(bookings));
  }, [bookings]);

  // ✅ Handle field change
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

  // ✅ Fix overlap check
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

  // ✅ Submit handler
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

    // 🔴 Check if villa already booked
    const conflict = bookings.find(
      (b) =>
        b.villa === formData.villa &&
        isDateOverlap(b.checkIn, b.checkOut, formData.checkIn, formData.checkOut)
    );

    if (conflict) {
      toast.error(
        `${formData.villa} is already booked from ${conflict.checkIn} to ${conflict.checkOut} ❌`,
        {
          duration: 5000,
          position: "top-center",
        }
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ Send to Formspree
      const res = await fetch("https://formspree.io/f/xandydqw", {
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
        toast.success("Booking confirmed! ✅ Thankyou.", {
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

        // ✅ Also send details to WhatsApp
        const whatsappNumber = "917994144472"; // ← Your WhatsApp number in international format without +
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

        // Reset form
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

  // ✅ Static Info
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 79941 44472",
      description: "Available 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact.asteya@gmail.com",
      description: "Reach us anytime",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "South Cliff, Varkala",
      description: "Kerala, India 695141",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Quick",
      description: "We respond immediately",
    },
  ];

  const bookingInfo = [
    { label: "Room Rate", value: "PRICE ON REQUEST" },
    { label: "Minimum Stay", value: "1 DAY" },
    { label: "Check-in / Check-out", value: "3:00 PM / 12:00 PM" },
    { label: "Advance Booking", value: "50% advance required" },
    { label: "Cancellation", value: "Free up to 48 hours" },
    {
      label: "Maximum Guests",
      value: "Maximum 4 guests (For more than 4 persons, please inquire)",
    },
    { label: "Payment Methods", value: "Cash / UPI / Bank Transfer" },
    { label: "Confirmation", value: "Email / WhatsApp" },
  ];

  return (
    <>
      {/* ✅ Navbar at top */}
      <Navbar />

      <section className="relative bg-white py-24 text-gray-900">
        <Toaster />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Experience luxury at Kerala South Cliff Beach View Villas. Fill out
              the form below or reach out directly.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 bg-gray-100 rounded-3xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-black flex items-center justify-center">
                  <info.icon className="text-white" size={28} />
                </div>
                <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                <p className="font-medium">{info.value}</p>
                <p className="text-sm text-center mt-1">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Form + Booking Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="w-full rounded-xl p-8 bg-white shadow-lg border border-gray-200">
              {/* ✅ Your Form Code (unchanged) */}
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Name & Email */}
                {/* ... rest of form stays same ... */}
              </form>
            </div>

            {/* Booking Info */}
            <Card className="bg-gray-100 shadow-lg rounded-3xl p-10 flex flex-col justify-between">
              <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
              <div className="space-y-4">
                {bookingInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-black mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-white p-4 rounded-xl border border-black">
                <h4 className="font-semibold mb-1">Special Offer</h4>
                <p className="text-sm">
                  Book for 7 nights or more and get 15% discount. Seasonal offers
                  available.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ Footer at bottom */}
      <Footer />
    </>
  );
}
