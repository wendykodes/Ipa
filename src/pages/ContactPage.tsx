import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      city: 'Kampala Studio & Central Atelier',
      address: 'Plot 28 Upper Kololo Terrace, Nakasero Ridge',
      country: 'Kampala, Uganda',
      phone: '+256 772 345 678',
      email: 'kampala@ipainteriors.com',
      hours: 'Mon – Fri: 08:30 – 18:00 EAT'
    },
    {
      city: 'London Atelier & Procurement',
      address: '14 Berkeley Square, Mayfair',
      country: 'London W1J 5AE, United Kingdom',
      phone: '+44 20 7946 0888',
      email: 'london@ipainteriors.com',
      hours: 'Mon – Fri: 09:00 – 17:30 GMT'
    },
    {
      city: 'Dubai Client Lounge',
      address: 'Gate Precinct 4, Level 5, DIFC',
      country: 'Dubai, United Arab Emirates',
      phone: '+971 4 312 8900',
      email: 'dubai@ipainteriors.com',
      hours: 'Mon – Fri: 09:00 – 18:00 GST'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        <div className="border-b border-[#EDE8E1] pb-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#801D31] font-semibold block">
            Direct Inquiries & Ateliers
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-stone-900 tracking-tight mt-1">
            Global Studios & Consultations
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl font-light leading-relaxed">
            Connect directly with our Lead Interior Architects and Project Directors for private consultations, site visits, and commission inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Studios List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {offices.map((off, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#EDE8E1] rounded-[2px] space-y-4 shadow-xs"
                >
                  <div className="flex items-center gap-2 text-[#801D31]">
                    <MapPin className="w-4 h-4" />
                    <h3 className="font-serif-luxury text-xl font-light text-stone-900">
                      {off.city}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-600 space-y-1 font-light">
                    <p>{off.address}</p>
                    <p>{off.country}</p>
                  </div>
                  <div className="pt-3 border-t border-[#EDE8E1] text-xs font-mono space-y-1 text-stone-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{off.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{off.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 pt-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{off.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Contact Form */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-white border border-[#EDE8E1] rounded-[2px] space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-2xl font-light text-stone-900">
                Direct Studio Inquiry
              </h2>
              <p className="text-xs text-stone-500 font-light">
                We respond to all private client commission inquiries within one business day.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#FAF9F6] border border-[#EDE8E1] text-center space-y-3 rounded-[2px]">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-600/30">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl font-light text-stone-900">Inquiry Transmitted</h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Your communication has been dispatched to the Studio Principal. A partner will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Catherine Hamilton"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. catherine@hamilton.com"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    Property Location & Scope
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify estate location, target timeline, or architectural requirements..."
                    className="w-full p-3 bg-[#FAF9F6] border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
