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
  const [bookings, setBookings] = useState<
    { villa: string; checkIn: string; checkOut: string }[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("villaBookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("villaBookings", JSON.stringify(bookings));
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
    return (
      new Date(checkIn1) <= new Date(checkOut2) &&
      new Date(checkOut1) >= new Date(checkIn2)
    );
  };

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
      <Navbar />
      <section className="relative bg-white py-24 text-gray-900">
        <Toaster />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... your entire existing content ... */}
        </div>
      </section>
      <Footer />
    </>
  );
}
