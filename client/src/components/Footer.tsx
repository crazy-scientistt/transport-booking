/*
  DESIGN: Desert Oasis Luxury
  - Dark footer with gold accents
  - Contact information
  - Quick links
*/

import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { buildWhatsAppUrl, contactSettings } from '@/data/pricing';
import { getFeaturedSeoPages, routeHref, seoPages } from '@/data/seoPages';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Our Fleet', href: '/#vehicles' },
    { label: 'Services', href: '/#services' },
    { label: 'Routes', href: '/#routes' },
    { label: 'Prices', href: routeHref('/umrah-taxi-prices') },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  const topRoutes = getFeaturedSeoPages(6);

  return (
    <footer id="contact" className="bg-[#1C1C1E] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center">
                <span className="text-white font-display text-lg font-bold">U</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Umrah Taxi</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Private Umrah taxi service for Jeddah Airport, Makkah, Madinah, Ziyarat tours,
              family transfers, and intercity travel in Saudi Arabia.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={buildWhatsAppUrl(contactSettings.floatingWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Top Routes</h4>
            <ul className="space-y-3">
              {topRoutes.map((route) => (
                <li key={route.path}>
                  <a
                    href={routeHref(route.path)}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {route.h1}
                  </a>
                </li>
              ))}
            </ul>
            <a href={routeHref('/umrah-taxi-prices')} className="inline-block mt-4 text-sm text-gold hover:text-white transition-colors">
              View all Umrah taxi prices
            </a>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Phone / WhatsApp</p>
                  <a
                    href={`tel:${contactSettings.phoneNumber}`}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {contactSettings.phoneNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Service Areas</p>
                  <p className="text-white">Jeddah, Makkah, Madinah, Taif</p>
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

        <div className="mt-10 pt-8 border-t border-white/10">
          <h4 className="font-display text-lg font-semibold mb-4">All Umrah Taxi Routes</h4>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {seoPages.map((route) => (
              <a
                key={route.path}
                href={routeHref(route.path)}
                className="text-sm text-white/50 hover:text-gold transition-colors"
              >
                {route.h1}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} Umrah Taxi. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="/#contact" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/#contact" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
