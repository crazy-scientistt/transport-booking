/*
  DESIGN: Desert Oasis Luxury
  - Sticky header with warm ivory background
  - Gold accents on hover
  - Cart badge with emerald background
*/

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { contactSettings } from '@/data/pricing';

interface HeaderProps {
  onCartClick: () => void;
}

const navLinks = [
  { href: '#vehicles', label: 'Our Fleet' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ onCartClick }: HeaderProps) {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const textClass = isScrolled ? 'text-foreground' : 'text-white';
  const mutedTextClass = isScrolled ? 'text-muted-foreground' : 'text-white/80';
  const navClass = isScrolled
    ? 'text-foreground/80 hover:text-emerald'
    : 'text-white/90 hover:text-gold';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-3 group" aria-label="Umrah Taxi home">
            <div className="w-10 h-10 rounded-full bg-emerald text-white flex items-center justify-center shadow-md">
              <span className="font-display text-lg font-bold">U</span>
            </div>
            <div>
              <h1 className={`font-display text-lg md:text-xl font-semibold transition-colors ${textClass} group-hover:text-gold`}>
                Umrah Taxi
              </h1>
              <p className={`hidden sm:block text-xs -mt-1 transition-colors ${mutedTextClass}`}>
                Sacred Journey Services
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`font-body text-sm font-medium transition-colors relative group ${navClass}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={`tel:${contactSettings.phoneNumber}`}
              className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${navClass}`}
            >
              <Phone className="w-4 h-4" />
              <span>{contactSettings.phoneNumber}</span>
            </a>

            <Button
              variant="outline"
              size="icon"
              onClick={onCartClick}
              className={`relative transition-all ${
                isScrolled
                  ? 'border-gold/30 hover:border-gold hover:bg-gold/10 text-foreground'
                  : 'border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white'
              }`}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-emerald text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white hover:text-white hover:bg-white/10'}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute right-0 top-0 h-dvh w-[280px] bg-ivory shadow-xl p-6 animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-display text-lg font-semibold">Umrah Taxi</p>
                <p className="text-xs text-muted-foreground">Sacred Journey Services</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="font-body text-lg font-medium text-foreground hover:text-emerald transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-border" />
              <a
                href={`tel:${contactSettings.phoneNumber}`}
                className="flex items-center gap-2 text-foreground hover:text-emerald transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{contactSettings.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
