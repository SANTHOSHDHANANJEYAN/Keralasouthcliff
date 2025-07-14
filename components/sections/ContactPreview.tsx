'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const ContactPreview = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9876543210',
      description: 'Available 24/7 for bookings and inquiries',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@keralavillas.com',
      description: 'Get in touch via email',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'South Cliff, Varkala',
      description: 'Kerala, India',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 2 hours',
      description: 'Quick response guaranteed',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">Get in Touch</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience luxury at Kerala South Cliff Beach View Villas? 
            Contact us for bookings, inquiries, or to plan your perfect getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.value}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quick Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Inquiry</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your message..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Information */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Room Rate</p>
                    <p className="text-gray-600">$8,500 per night (both villas)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Minimum Stay</p>
                    <p className="text-gray-600">2 nights minimum booking required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Check-in / Check-out</p>
                    <p className="text-gray-600">3:00 PM / 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Advance Booking</p>
                    <p className="text-gray-600">50% advance payment required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Cancellation</p>
                    <p className="text-gray-600">Free cancellation up to 48 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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