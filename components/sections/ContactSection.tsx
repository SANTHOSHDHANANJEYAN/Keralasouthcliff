"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });
import "react-phone-input-2/lib/style.css";

const ContactSection = () => {
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

  // ✅ Fix overlap check (inclusive)
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

    // 🔴 Check if villa already booked in that date range
    const conflict = bookings.some(
      (b) =>
        b.villa === formData.villa &&
        isDateOverlap(b.checkIn, b.checkOut, formData.checkIn, formData.checkOut)
    );

    if (conflict) {
      toast.error(`${formData.villa} is already booked for these dates ❌`, {
        duration: 4000,
        position: "top-center",
      });
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
        }),
      });

      if (res.ok) {
        toast.success("Booking confirmed! ✅ Check your email.");

        setBookings((prev) => [
          ...prev,
          {
            villa: formData.villa,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
          },
        ]);

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
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (rest of your JSX stays exactly the same)
  
  return (
    <section className="relative bg-white py-24 text-gray-900">
      {/* keep your JSX unchanged */}
    </section>
  );
};

export default ContactSection;
