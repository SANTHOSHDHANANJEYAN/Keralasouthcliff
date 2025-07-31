'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 9876543210',
    description: 'Available 24/7 for bookings and inquiries',
    gradient: 'from-gray-700 to-black',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@keralavillas.com',
    description: 'Get in touch via email',
    gradient: 'from-gray-700 to-black',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'South Cliff, Varkala',
    description: 'Kerala, India',
    gradient: 'from-gray-700 to-black',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 2 hours',
    description: 'Quick response guaranteed',
    gradient: 'from-gray-700 to-black',
  },
];

const ContactPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to experience luxury at Kerala South Cliff Beach View Villas?
            Contact us for bookings, inquiries, or to plan your perfect getaway.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                >
                  <info.icon className="text-white" size={22} />
                </div>
                <h3 className="text-base font-semibold text-black">{info.title}</h3>
                <p className="text-sm font-medium text-gray-800">{info.value}</p>
                <p className="text-xs text-gray-500 mt-1">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form + Info Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Quick Contact Form */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">Quick Inquiry</h3>
              <form className="space-y-4">
                {['Name', 'Email'].map((label) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      {label}
                    </label>
                    <input
                      type={label === 'Email' ? 'email' : 'text'}
                      placeholder={`Your ${label.toLowerCase()}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Information */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">Booking Information</h3>
              <div className="space-y-5">
                {[
                  ['Room Rate', '$8,500 per night (both villas)'],
                  ['Minimum Stay', '2 nights minimum booking required'],
                  ['Check-in / Check-out', '3:00 PM / 12:00 PM'],
                  ['Advance Booking', '50% advance payment required'],
                  ['Cancellation', 'Free cancellation up to 48 hours'],
                ].map(([label, value], i) => (
                  <div className="flex items-start gap-3" key={i}>
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-black">{label}</p>
                      <p className="text-sm text-gray-600">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-3 text-base sm:text-lg"
            >
              Complete Contact Form
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
