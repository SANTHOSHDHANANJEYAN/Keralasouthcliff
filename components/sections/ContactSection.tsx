'use client';

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    villa: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Message sent successfully! We'll contact you shortly. Phone: ${formData.phone}`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        villa: '',
        message: ''
      });
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+91 79941 44472', description: 'Available 24/7' },
    { icon: Mail, title: 'Email', value: 'contact.asteya@gmail.com', description: 'Reach us anytime' },
    { icon: MapPin, title: 'Location', value: 'South Cliff, Varkala', description: 'Kerala, India 695141' },
    { icon: Clock, title: 'Response Time', value: 'Quick', description: 'We respond within 2 hours' }
  ];

  const bookingInfo = [
    { label: 'Room Rate', value: 'PRICE ON REQUEST' },
    { label: 'Minimum Stay', value: '1 DAY' },
    { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
    { label: 'Advance Booking', value: '50% advance required' },
    { label: 'Cancellation', value: 'Free up to 48 hours' },
    { label: 'Maximum Guests', value: '4 guests per villa' },
    { label: 'Payment Methods', value: 'Credit card, bank transfer, PayPal' },
    { label: 'Confirmation', value: 'Email / WhatsApp' }
  ];

  return (
    <section className="relative bg-white py-24 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Experience luxury at Kerala South Cliff Beach View Villas. Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Info Cards */}
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

        {/* Main Form + Booking Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <Card className="bg-gray-100 shadow-lg rounded-3xl">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold mb-8 text-center">Booking & Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <PhoneInput
                      country={'in'}
                      value={formData.phone}
                      onChange={(phone) => setFormData({ ...formData, phone })}
                      inputClass="w-[15rem] px-4 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-black"
                      dropdownClass="z-50"
                      enableSearch
                      inputStyle={{ height: '48px', color: '#000' }}
                      buttonStyle={{ width: '2.5rem' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    >
                      <option value="">Select Guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Villa Preference</label>
                    <select
                      name="villa"
                      value={formData.villa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    >
                      <option value="">Select Villa</option>
                      <option value="ground-floor">Ground Floor</option>
                      <option value="top-floor">Top Floor</option>
                      <option value="either">Either</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Your Requirements..."
                      className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border border-black flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Information */}
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
              <p className="text-sm">Book for 7 nights or more and get 15% discount. Seasonal offers available.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
