'use client';

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    villa: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // remove error once user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'phone', 'checkIn', 'checkOut', 'villa'];
    const newErrors: { [key: string]: boolean } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('⚠️ Please fill all required fields before submitting.');
      return;
    }

    const subject = encodeURIComponent('Villa Booking & Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Guests: ${formData.guests}\n` +
        `Check-in: ${formData.checkIn}\n` +
        `Check-out: ${formData.checkOut}\n` +
        `Villa Preference: ${formData.villa}\n` +
        `Message: ${formData.message}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=contact.asteya@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      villa: '',
      message: ''
    });
    setErrors({});
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+91 79941 44472', description: 'Available 24/7' },
    { icon: Mail, title: 'Email', value: 'contact.asteya@gmail.com', description: 'Reach us anytime' },
    { icon: MapPin, title: 'Location', value: 'South Cliff, Varkala', description: 'Kerala, India 695141' },
    { icon: Clock, title: 'Response Time', value: 'Quick', description: 'We respond Immediately' }
  ];

  const bookingInfo = [
    { label: 'Room Rate', value: 'PRICE ON REQUEST' },
    { label: 'Minimum Stay', value: '1 DAY' },
    { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
    { label: 'Advance Booking', value: '50% advance required' },
    { label: 'Cancellation', value: 'Free up to 48 hours' },
    { label: 'Maximum Guests', value: 'Maximum 4 guests (For more than 4 persons, please inquire)' },
    { label: 'Payment Methods', value: 'Cash / UPI / Bank Transfer' },
    { label: 'Confirmation', value: 'Email / WhatsApp' }
  ];

  return (
    <section className="relative bg-white py-24 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Experience luxury at Kerala South Cliff Beach View Villas. Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
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

        {/* Form & Booking Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="w-full rounded-xl p-8 bg-white shadow-lg border border-gray-200">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-yellow-400`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-yellow-400`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={(phone) => {
                    setFormData({ ...formData, phone });
                    setErrors({ ...errors, phone: false });
                  }}
                  inputClass={`!w-full !p-3 !rounded-md !border ${
                    errors.phone ? '!border-red-500' : '!border-gray-300'
                  } !focus:ring-2 !focus:ring-yellow-400`}
                />
              </div>

              {/* Check-in / Check-out / Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.checkIn ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-yellow-400`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.checkOut ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-yellow-400`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <input
                    type="number"
                    name="guests"
                    min={1}
                    max={4}
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Villa Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Villa</label>
                <select
                  name="villa"
                  value={formData.villa}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.villa ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:ring-2 focus:ring-yellow-400`}
                >
                  <option value="">Choose an option</option>
                  <option value="Top Floor">Top Floor</option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="Entire Villa">Entire Villa</option>
                </select>
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
                />
                <span className="text-xs text-gray-400 float-right">{formData.message.length}/180</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded-md hover:bg-green-800 transition-colors"
              >
                Enquire Now
              </button>
            </form>
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
            <div className="mt-8 bg-white p-4 rounded-xl border border-black">
              <h4 className="font-semibold mb-1">Special Offer</h4>
              <p className="text-sm">
                Book for 7 nights or more and get 15% discount. Seasonal offers available.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
