/*
  DESIGN: Desert Oasis Luxury
  - Neo-Arabian Minimalism with Art Deco touches
  - Warm ivory/sand canvas with gold and emerald accents
  - Flowing geometry inspired by sand dunes
  - Reverent elegance for spiritual travel
*/

import { useState, useEffect, lazy, Suspense } from 'react';
import { Vehicle, bookingPriceSettings } from '@/data/pricing';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VehicleFleet from '@/components/VehicleFleet';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const ServiceSelector = lazy(() => import('@/components/ServiceSelector'));
const CartDrawer = lazy(() => import('@/components/CartDrawer'));
const WhatsAppConfirmation = lazy(() => import('@/components/WhatsAppConfirmation'));
const WelcomePopup = lazy(() => import('@/components/WelcomePopup'));

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [serviceSelectorOpen, setServiceSelectorOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);

  useEffect(() => {
    if (!bookingPriceSettings.showWelcomePopupOnFirstVisit) return;

    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      const timer = window.setTimeout(() => {
        setWelcomePopupOpen(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, bookingPriceSettings.welcomePopupDelayMs);

      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setServiceSelectorOpen(true);
  };

  const handleCategoryClick = () => {
    const element = document.querySelector('#vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    setWelcomePopupOpen(true);
  };

  const handleBrowseMore = () => {
    const element = document.querySelector('#vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    setWhatsappModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header onCartClick={() => setCartDrawerOpen(true)} />

      <main>
        <Hero onBookNow={handleBookNow} />
        <VehicleFleet onSelectVehicle={handleSelectVehicle} />
        <ServicesSection onCategoryClick={handleCategoryClick} />
        <AboutSection />
      </main>

      <Footer />

      <Suspense fallback={null}>
        {serviceSelectorOpen && selectedVehicle && (
          <ServiceSelector
            vehicle={selectedVehicle}
            open={serviceSelectorOpen}
            onClose={() => {
              setServiceSelectorOpen(false);
              setSelectedVehicle(null);
            }}
          />
        )}

        {cartDrawerOpen && (
          <CartDrawer
            open={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            onCheckout={handleCheckout}
          />
        )}

        {whatsappModalOpen && (
          <WhatsAppConfirmation
            open={whatsappModalOpen}
            onClose={() => setWhatsappModalOpen(false)}
          />
        )}

        {welcomePopupOpen && (
          <WelcomePopup
            open={welcomePopupOpen}
            onClose={() => setWelcomePopupOpen(false)}
            onBrowseMore={handleBrowseMore}
          />
        )}
      </Suspense>

      <FloatingWhatsApp />
    </div>
  );
}
