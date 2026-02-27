/*
  DESIGN: Desert Oasis Luxury
  - Dark footer with gold accents
  - Contact information
  - Quick links
*/

import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

const WHATSAPP_NUMBER = '+966579693883';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Our Fleet', href: '#vehicles' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Airport Transfers',
    'Intercity Travel',
    'Ziyarat Tours',
    'Meeqat Services',
    'Hourly Rental',
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#1C1C1E] text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center">
                <span className="text-white font-display text-lg font-bold">P</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Premium Transport</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner for premium transportation services in Saudi Arabia. 
              Serving pilgrims and travelers with comfort and reliability.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Phone / WhatsApp</p>
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Service Areas</p>
                  <p className="text-white">Jeddah, Makkah, Madina</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Availability</p>
                  <p className="text-white">24/7 Service</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} Premium Transportation Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
