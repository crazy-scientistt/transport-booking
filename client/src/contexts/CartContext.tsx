import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getVehicleById, getServiceById, getPrice, formatPrice } from '@/data/pricing';

export interface CartItem {
  id: string;
  vehicleId: string;
  serviceId: string;
  date: string;
  time: string;
  price: number;
  addedAt: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  getItemDetails: (item: CartItem) => {
    vehicleName: string;
    serviceName: string;
    formattedPrice: string;
    formattedDate: string;
    formattedTime: string;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'transport-booking-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id' | 'addedAt'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.vehicleId}-${item.serviceId}-${Date.now()}`,
      addedAt: Date.now(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  const getItemDetails = (item: CartItem) => {
    const vehicle = getVehicleById(item.vehicleId);
    const service = getServiceById(item.serviceId);
    
    // Format date
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    
    // Format time
    const [hours, minutes] = item.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;
    
    return {
      vehicleName: vehicle?.name || 'Unknown Vehicle',
      serviceName: service?.name || 'Unknown Service',
      formattedPrice: formatPrice(item.price),
      formattedDate,
      formattedTime,
    };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalPrice,
        itemCount,
        getItemDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
