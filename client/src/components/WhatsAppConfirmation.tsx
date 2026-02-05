/*
  DESIGN: Desert Oasis Luxury
  - Confirmation modal before WhatsApp redirect
  - Complete cart summary display
  - Gold accent on confirm button
*/

import { motion } from 'framer-motion';
import { MessageCircle, Check, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/pricing';

interface WhatsAppConfirmationProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '+966569713833';

export default function WhatsAppConfirmation({ open, onClose }: WhatsAppConfirmationProps) {
  const { items, totalPrice, getItemDetails, clearCart } = useCart();

  const generateWhatsAppMessage = () => {
    let message = 'Hello, I would like to book the following transportation services:\n\n';

    items.forEach((item, index) => {
      const details = getItemDetails(item);
      message += `${index + 1}. ${details.serviceName}\n`;
      message += `   • Vehicle: ${details.vehicleName}\n`;
      message += `   • Date: ${details.formattedDate}\n`;
      message += `   • Time: ${details.formattedTime}\n`;
      message += `   • Price: ${details.formattedPrice}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Total Amount: ${formatPrice(totalPrice)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please confirm my booking. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleConfirm = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-emerald" />
            Confirm Your Booking
          </DialogTitle>
          <DialogDescription>
            Review your booking details before continuing to WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {/* Booking Summary */}
        <ScrollArea className="max-h-[40vh]">
          <div className="space-y-4 py-4">
            {items.map((item, index) => {
              const details = getItemDetails(item);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-sand rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{details.serviceName}</h4>
                      <p className="text-sm text-muted-foreground">{details.vehicleName}</p>
                      <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{details.formattedDate}</span>
                        <span>•</span>
                        <span>{details.formattedTime}</span>
                      </div>
                    </div>
                    <p className="font-display font-bold text-emerald">
                      {details.formattedPrice}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="text-lg font-semibold">Total Amount</span>
          <span className="font-display text-2xl font-bold text-emerald">
            {formatPrice(totalPrice)}
          </span>
        </div>

        {/* WhatsApp Info */}
        <div className="flex items-center gap-3 p-3 bg-emerald/10 rounded-lg">
          <Phone className="w-5 h-5 text-emerald" />
          <div>
            <p className="text-sm font-medium">WhatsApp Number</p>
            <p className="text-sm text-muted-foreground">{WHATSAPP_NUMBER}</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Continue to WhatsApp
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
