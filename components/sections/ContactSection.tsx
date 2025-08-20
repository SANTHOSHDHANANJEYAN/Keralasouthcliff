'use client';

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("Villa Booking & Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGuests: ${formData.guests}\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nVilla Preference: ${formData.villa}\nMessage: ${formData.message}`
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
    <section className="relative bg-gradient-to-b from-white via-blue-50 to-white py-24 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
            Book Your Stay
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury at Kerala South Cliff Beach View Villas. Fill out the form below or reach out directly.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center shadow-md">
                <info.icon className="text-white" size={28} />
              </div>
              <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
              <p className="font-medium">{info.value}</p>
              <p className="text-sm text-gray-500 text-center mt-1">{info.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Form & Booking Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <Card className="bg-white shadow-2xl rounded-3xl p-10">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />

              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !p-3 !border !border-gray-200 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-green-500 !bg-white"
              />

              {/* Dates side by side */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                />
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                />
              </div>

              <input
                type="number"
                name="guests"
                min={1}
                max={4}
                value={formData.guests}
                onChange={handleChange}
                placeholder="Guests (max 4)"
                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />

              <select
                name="villa"
                value={formData.villa}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Select Villa</option>
                <option value="50 Hr Multi-Style-Yoga TTC">50 Hr Multi-Style-Yoga TTC</option>
                <option value="100 Hr Multi-Style-Yoga TTC">100 Hr Multi-Style-Yoga TTC</option>
                <option value="200 Hr Multi-Style-Yoga TTC">200 Hr Multi-Style-Yoga TTC</option>
                <option value="300 Hr Multi-Style-Yoga TTC">300 Hr Multi-Style-Yoga TTC</option>
                <option value="21 Days Yoga Immersion Course">21 Days Yoga Immersion Course</option>
                <option value="7 Days Yoga Holiday Retreat">7 Days Yoga Holiday Retreat</option>
                <option value="14 Days Yoga Detox Retreat">14 Days Yoga Detox Retreat</option>
                <option value="21 Days Yoga Wellness Retreat">21 Days Yoga Wellness Retreat</option>
              </select>

              <textarea
                name="message"
                rows={4}
                placeholder="Enter your message..."
                maxLength={180}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />
              <span className="text-sm text-gray-400 self-end">{formData.message.length}/180</span>

              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Enquire Now
              </button>
            </form>
          </Card>

          {/* Booking Info */}
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 shadow-xl rounded-3xl p-10 flex flex-col justify-between">
            <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
            <div className="space-y-5">
              {bookingInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-white p-6 rounded-2xl border border-green-200 shadow-sm">
              <h4 className="font-semibold mb-2 text-green-700">Special Offer</h4>
              <p className="text-sm text-gray-600">Book for 7 nights or more and get 15% discount. Seasonal offers available.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
