/*
  DESIGN: Desert Oasis Luxury
  - Full-bleed hero with dramatic imagery
  - Warm golden overlay
  - Elegant typography with Playfair Display
*/

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
      <div className="absolute inset-0">
        <img
          src={heroBannerImage}
          alt="Luxury transportation in Saudi Arabia"
          className="w-full h-full object-cover"
          width={1920}
          height={1072}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-6 animate-fade-in-up">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-white/90">Premium Transportation Services</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animation-delay-100">
            Your Sacred Journey{' '}
            <span className="text-gold">Begins Here</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
            Experience premium transportation between Jeddah, Makkah, and Madinah.
            Professional drivers, comfortable vehicles, and seamless booking for pilgrims and travelers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
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
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-12 text-white/70 animate-fade-in animation-delay-500">
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
          </div>
        </div>
      </div>

      <button
        onClick={scrollToVehicles}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce-subtle"
        aria-label="Scroll to vehicles"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
