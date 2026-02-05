/*
  DESIGN: Desert Oasis Luxury
  - Full-bleed hero with dramatic imagery
  - Warm golden overlay
  - Elegant typography with Playfair Display
  - Flowing animation entrance
*/

import { motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroBannerImage } from '@/data/pricing';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  const scrollToVehicles = () => {
    const element = document.querySelector('#vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBannerImage}
          alt="Luxury transportation in Saudi Arabia"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-6"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-white/90">Premium Transportation Services</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Your Sacred Journey{' '}
            <span className="text-gold">Begins Here</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          >
            Experience premium transportation between Jeddah, Makkah, and Madina. 
            Professional drivers, comfortable vehicles, and seamless booking for pilgrims and travelers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={onBookNow}
              className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToVehicles}
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
            >
              View Our Fleet
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 mt-12 text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-sm">5-Star Service</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <span className="text-sm">24/7 Availability</span>
            <div className="w-px h-4 bg-white/30" />
            <span className="text-sm">Professional Drivers</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={scrollToVehicles}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
