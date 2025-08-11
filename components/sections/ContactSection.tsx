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
    countryCode: '+91',
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

    // Combine full phone number
    const fullPhone = `${formData.countryCode} ${formData.phone}`;

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Message sent successfully! We'll get back to you within 2 hours. Phone: ${fullPhone}`);
      setFormData({
        name: '',
        email: '',
        countryCode: '+91',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+91 9876543210', description: 'Available 24/7 for bookings and inquiries' },
    { icon: Mail, title: 'Email', value: 'info@keralavillas.com', description: 'Get in touch via email' },
    { icon: MapPin, title: 'Location', value: 'South Cliff, Varkala', description: 'Kerala, India 695141' },
    { icon: Clock, title: 'Response Time', value: 'Within 2 hours', description: 'Quick response guaranteed' }
  ];

  const bookingInfo = [
    { label: 'Room Rate', value: 'Give request for Price Details(both villas)' },
    { label: 'Minimum Stay', value: '2 nights minimum booking required' },
    { label: 'Check-in / Check-out', value: '3:00 PM / 12:00 PM' },
    { label: 'Advance Booking', value: '50% advance payment required' },
    { label: 'Cancellation', value: 'Free cancellation up to 48 hours' },
    { label: 'Maximum Guests', value: '4 guests per villa' },
    { label: 'Payment Methods', value: 'Credit card, bank transfer, PayPal' },
    { label: 'Booking Confirmation', value: 'Instant confirmation via email' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white border border-black">Get in Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Contact & Booking
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to experience luxury at Kerala South Cliff Beach View Villas? Contact us for bookings, inquiries, or to plan your perfect getaway.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-100">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{info.title}</h3>
                <p className="text-black font-medium mb-1">{info.value}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Booking Form */}
          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Booking & Inquiry Form</h3>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="flex">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 border-l-0 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Villa Preference</label>
                  <select
                    name="villa"
                    value={formData.villa}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border border-black"
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

          {/* Booking Info */}
          <Card className="bg-gray-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Booking Information</h3>
              <div className="space-y-4">
                {bookingInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-black mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-medium text-black">{info.label}</p>
                      <p className="text-gray-700">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-white border border-black rounded-lg">
                <h4 className="font-semibold text-black mb-2">Special Offer</h4>
                <p className="text-gray-700 text-sm">
                  Book for 7 nights or more and get 15% discount. Contact us for seasonal offers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="max-w-2xl mx-auto bg-black text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
            <p className="mb-4">
              For urgent inquiries, call our 24/7 emergency hotline:
            </p>
            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              <Phone size={20} />
              <span>+91 9876543210</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Available 24/7</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
