/*
  DESIGN: Desert Oasis Luxury
  - Floating WhatsApp button for quick contact
  - Uses the same WhatsApp number as checkout and footer
*/

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, contactSettings } from '@/data/pricing';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    window.open(buildWhatsAppUrl(contactSettings.floatingWhatsAppMessage), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      aria-label="Contact via WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <MessageCircle className="w-7 h-7 relative z-10" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-white text-foreground text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </button>
  );
}
