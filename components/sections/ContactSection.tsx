'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We\'ll get back to you within 2 hours.');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      description: 'Kerala, India 695141',
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

  const bookingInfo = [
    { label: 'Room Rate', value: '$8,500 per night (both villas)' },
    { label: 'Minimum Stay', value: '2 nights minimum booking required' },
    { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
    { label: 'Advance Booking', value: '50% advance payment required' },
    { label: 'Cancellation', value: 'Free cancellation up to 48 hours' },
    { label: 'Maximum Guests', value: '4 guests per villa' },
    { label: 'Payment Methods', value: 'Credit card, bank transfer, PayPal' },
    { label: 'Booking Confirmation', value: 'Instant confirmation via email' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact & Booking
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience luxury at Kerala South Cliff Beach View Villas? 
            Contact us for bookings, inquiries, or to plan your perfect getaway.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Booking Form */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking & Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                    <input 
                      type="date" 
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                    <input 
                      type="date" 
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Villa Preference</label>
                  <select 
                    name="villa"
                    value={formData.villa}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select villa</option>
                    <option value="ground-floor">Ground Floor Villa</option>
                    <option value="top-floor">Top Floor Villa</option>
                    <option value="either">Either Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your requirements, special requests, or any questions..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={16} />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Information */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Information</h3>
              <div className="space-y-4">
                {bookingInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">{info.label}</p>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Special Offer</h4>
                <p className="text-blue-800 text-sm">
                  Book for 7 nights or more and get 15% discount on your total stay. 
                  Contact us for more details about seasonal offers and packages.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contact</h3>
            <p className="text-gray-600 mb-4">
              For urgent inquiries or last-minute bookings, please call our 24/7 emergency hotline:
            </p>
            <div className="flex items-center justify-center gap-2 text-xl font-semibold text-green-600">
              <Phone size={20} />
              <span>+91 9876543210</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Available 24 hours a day, 7 days a week</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;