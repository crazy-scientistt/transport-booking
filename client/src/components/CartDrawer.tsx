/*
  DESIGN: Desert Oasis Luxury
  - Slide-in drawer from right
  - Gold accents on totals
  - Elegant item cards
  - WhatsApp integration button
*/

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart, CartItem } from '@/contexts/CartContext';
import { formatPrice } from '@/data/pricing';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

function CartItemCard({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  const { getItemDetails } = useCart();
  const details = getItemDetails(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-lg p-4 border border-border/50 shadow-sm"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{details.serviceName}</h4>
          <p className="text-sm text-muted-foreground mt-1">{details.vehicleName}</p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 bg-sand rounded">{details.formattedDate}</span>
            <span className="px-2 py-0.5 bg-sand rounded">{details.formattedTime}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-display text-lg font-bold text-emerald">
            {details.formattedPrice}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, totalPrice, clearCart, removeItem } = useCart();

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-ivory">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Add services to your cart to begin booking your journey.
            </p>
            <Button onClick={onClose} className="bg-emerald hover:bg-emerald/90">
              Browse Services
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3 py-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="flex-shrink-0 pt-4 border-t space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items ({items.length})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-emerald">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={onCheckout}
                  className="w-full bg-emerald hover:bg-emerald/90 text-white font-semibold py-6"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full text-muted-foreground hover:text-destructive hover:border-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 p-3 bg-sand rounded-lg text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  Clicking "Book via WhatsApp" will open WhatsApp with your booking details. 
                  Our team will confirm your reservation shortly.
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
