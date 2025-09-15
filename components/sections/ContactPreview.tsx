'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 79941 44472',
    description: 'Available 24/7 for bookings and inquiries',
    gradient: 'from-gray-700 to-black',
    href: 'tel:+917994144472',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact.asteya@gmail.com',
    description: 'Get in touch via email',
    gradient: 'from-gray-700 to-black',
    href: 'mailto:contact.asteya@gmail.com?subject=Booking%20Inquiry&body=Hello%20Asteya%20Team,',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'South Cliff, Varkala',
    description: 'Kerala, India',
    gradient: 'from-gray-700 to-black',
    href: 'https://maps.app.goo.gl/sbbtj2xxEJfrK5YY7',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Quick Response',
    description: 'Quick response guaranteed',
    gradient: 'from-gray-700 to-black',
    href: null,
  },
];

const ContactPreview = () => {
  return (
    <section className="pb-[2rem] bg-gradient-to-b from-white to-gray-100">
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
          {contactInfo.map((info, index) => {
            const Content = (
              <Card
                key={index}
                className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
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
            );

            return info.href ? (
              <a
                key={index}
                href={info.href}
                target={info.title === 'Location' ? '_blank' : undefined}
                rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
              >
                {Content}
              </a>
            ) : (
              Content
            );
          })}
        </div>

        {/* Main Content: Policies on left, Booking Info on right */}
        <div className="grid gap-10 lg:grid-cols-2 mb-12">
          {/* Left Side: Cancellation and Date Change Policy */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">Cancellation Policy</h3>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <p>👉🏻 <strong>Cancellation 30 days or more before check-in:</strong></p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>✅ Full refund of the advance payment.</li>
                  </ul>
                  <p>👉🏻 <strong>Cancellation between 15 to 29 days before check-in:</strong></p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>🔁 50% of the advance will be refunded.</li>
                  </ul>
                  <p>👉🏻 <strong>Cancellation within 14 days of check-in or no-show:</strong></p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>❌ No refund of the advance payment.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">Date Change Policy</h3>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <p>👉🏻 <strong>One-time date change</strong> is allowed if requested at least 15 days before check-in, subject to availability.</p>
                  <p>Date changes may not be possible during high-demand periods (e.g. long weekends, holidays).</p>
                  <p className="mt-4">Looking forward to hosting you!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Booking Information with updated check-in/check-out */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">Booking Information</h3>
              <div className="space-y-5">
                {[
                  ['Room Rate', 'Give request for price details (both villas)'],
                  ['Minimum Stay', '1 Day minimum booking required'],
                  ['Check-in / Check-out', '2:00 PM / 10:30 AM'],
                  ['Advance Booking', '50% advance payment required'],
                  ['Cancellation', 'Free cancellation up to 48 hours'],
                  ['Maximum Guests', 'Maximum 3 guests'],
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
      </div>
    </section>
  );
};

export default ContactPreview;
