'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

// Phone input (CSR only)
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });
import 'react-phone-input-2/lib/style.css';

type FormState = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  villa: '' | 'Top Floor' | 'Ground Floor' | 'Entire Villa';
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  villa: '',
  message: ''
};

const ContactSection = () => {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
      setServerMessage({ type: '', text: '' });
    },
    []
  );

  const validate = () => {
    const req = ['name','email','phone','checkIn','checkOut','villa'] as const;
    const next: Record<string, string> = {};
    for (const f of req) {
      const v = (formData as any)[f];
      if (!v || (typeof v === 'string' && v.trim() === '')) next[f] = 'This field is required';
    }
    // extra checks
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) next.email = 'Enter a valid email';
    if (formData.checkIn && formData.checkOut && !(formData.checkIn < formData.checkOut)) {
      next.checkOut = 'Check-out must be after check-in';
    }
    if (formData.guests < 1) next.guests = 'At least 1 guest';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage({ type: '', text: '' });

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.code === 'DATE_UNAVAILABLE') {
          setServerMessage({ type: 'error', text: 'Sorry, those dates are already booked for this villa. Please try different dates or choose another villa.' });
        } else {
          setServerMessage({ type: 'error', text: data?.error || 'Something went wrong. Please try again.' });
        }
        return;
      }

      // Success
      setServerMessage({
        type: 'success',
        text: `Thanks ${formData.name}! Your booking request is confirmed. A confirmation email has been sent to ${formData.email}.`,
      });
      setFormData(initialForm);
      setErrors({});
    } catch (err) {
      setServerMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+91 79941 44472', description: 'Available 24/7' },
    { icon: Mail, title: 'Email', value: 'contact.asteya@gmail.com', description: 'Reach us anytime' },
    { icon: MapPin, title: 'Location', value: 'South Cliff, Varkala', description: 'Kerala, India 695141' },
    { icon: Clock, title: 'Response Time', value: 'Quick', description: 'We respond immediately' }
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

        {/* Form & Booking Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="w-full rounded-xl p-8 bg-white shadow-lg border border-gray-200">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Global server message */}
              {serverMessage.text && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    serverMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {serverMessage.text}
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['name','email'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:ring-2 focus:ring-black`}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={(phone) => {
                    setFormData((prev) => ({ ...prev, phone }));
                    setErrors((prev) => ({ ...prev, phone: '' }));
                    setServerMessage({ type: '', text: '' });
                  }}
                  inputClass={`!w-full !p-3 !rounded-md !border ${errors.phone ? '!border-red-500' : '!border-gray-300'} !focus:ring-2 !focus:ring-black`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Check-in / Check-out / Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['checkIn','checkOut'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="date"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:ring-2 focus:ring-black`}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
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
                    className={`w-full p-3 border ${errors.guests ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black`}
                  />
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                </div>
              </div>

              {/* Villa Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Villa</label>
                <select
                  name="villa"
                  value={formData.villa}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.villa ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black`}
                >
                  <option value="">Choose an option</option>
                  <option value="Top Floor">Top Floor</option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="Entire Villa">Entire Villa</option>
                </select>
                {errors.villa && <p className="text-red-500 text-xs mt-1">{errors.villa}</p>}
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
                <span className="text-xs text-gray-400 float-right">{formData.message.length}/180</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black text-white py-3 px-6 rounded-md transition-colors ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-800'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Enquire Now'}
              </button>

              {/* Small reassurance note */}
              <p className="text-xs text-gray-500">
                By submitting, you’ll receive a confirmation email. Your dates are secured immediately if available.
              </p>
            </form>
          </div>

          {/* Booking Info */}
          <Card className="bg-gray-100 shadow-lg rounded-3xl p-10 flex flex-col justify-between">
            <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
            <div className="space-y-4">
              {[
                { label: 'Room Rate', value: 'PRICE ON REQUEST' },
                { label: 'Minimum Stay', value: '1 DAY' },
                { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
                { label: 'Advance Booking', value: '50% advance required' },
                { label: 'Cancellation', value: 'Free up to 48 hours' },
                { label: 'Maximum Guests', value: 'Maximum 4 guests (For more than 4 persons, please inquire)' },
                { label: 'Payment Methods', value: 'Cash / UPI / Bank Transfer' },
                { label: 'Confirmation', value: 'Email / WhatsApp' }
              ].map((item, idx) => (
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
