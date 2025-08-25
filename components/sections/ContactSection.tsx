"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

// ✅ Dynamically import PhoneInput
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

  // ✅ Optimized handleChange
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

  // ✅ Submit Handler
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
      // 1️⃣ Save booking in MongoDB via API
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Booking failed");
        setIsSubmitting(false);
        return;
      }

      // 2️⃣ Send directly to Formspree (extra guarantee)
      const formspreeRes = await fetch("https://formspree.io/f/xovnaykg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          villa: formData.villa,
          guests: formData.guests.toString(),
          message: formData.message,
        }),
      });

      const formspreeData = await formspreeRes.json();
      if (!formspreeRes.ok) {
        console.error("Formspree error:", formspreeData);
        toast.error("Booking saved, but email not sent.");
      } else {
        toast.success("Booking confirmed & email sent!");
      }

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
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... keep the rest of your component unchanged (contact info, form UI, etc.)
  return (
    <section className="relative bg-white py-24 text-gray-900">
      {/* ✅ keep the exact JSX structure you already have, just updated handleSubmit */}
      {/* ... */}
    </section>
  );
};

export default ContactSection;
