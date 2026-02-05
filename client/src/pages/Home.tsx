/*
  DESIGN: Desert Oasis Luxury
  - Neo-Arabian Minimalism with Art Deco touches
  - Warm ivory/sand canvas with gold and emerald accents
  - Flowing geometry inspired by sand dunes
  - Reverent elegance for spiritual travel
*/

import { useState, useEffect } from 'react';
import { Vehicle } from '@/data/pricing';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VehicleFleet from '@/components/VehicleFleet';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import ServiceSelector from '@/components/ServiceSelector';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppConfirmation from '@/components/WhatsAppConfirmation';
import WelcomePopup from '@/components/WelcomePopup';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  // State for modals and drawers
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [serviceSelectorOpen, setServiceSelectorOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);

  // Show welcome popup on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setWelcomePopupOpen(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle vehicle selection
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setServiceSelectorOpen(true);
  };

  // Handle category click from services section
  const handleCategoryClick = (categoryId: string) => {
    // Scroll to vehicles section and show a toast
    const element = document.querySelector('#vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle book now from hero
  const handleBookNow = () => {
    setWelcomePopupOpen(true);
  };

  // Handle browse more from welcome popup
  const handleBrowseMore = () => {
    const element = document.querySelector('#vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setCartDrawerOpen(false);
    setWhatsappModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <Header onCartClick={() => setCartDrawerOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onBookNow={handleBookNow} />

        {/* Vehicle Fleet Section */}
        <VehicleFleet onSelectVehicle={handleSelectVehicle} />

        {/* Services Section */}
        <ServicesSection onCategoryClick={handleCategoryClick} />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <ServiceSelector
        vehicle={selectedVehicle}
        open={serviceSelectorOpen}
        onClose={() => {
          setServiceSelectorOpen(false);
          setSelectedVehicle(null);
        }}
      />

      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onCheckout={handleCheckout}
      />

      <WhatsAppConfirmation
        open={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
      />

      <WelcomePopup
        open={welcomePopupOpen}
        onClose={() => setWelcomePopupOpen(false)}
        onBrowseMore={handleBrowseMore}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
