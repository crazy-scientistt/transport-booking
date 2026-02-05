/*
  DESIGN: Desert Oasis Luxury
  - Modal/drawer for service selection
  - Each service has its own date/time picker
  - Gold accents on selected items
  - Smooth animations
  
  ✨ UPDATED: Now uses dynamic Ramadan pricing based on selected date
*/

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Plus, Check, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { useIsDateRamadanPricingPeriod } from '@/contexts/RamadanContext';
import { getPriceForServiceOnDate } from '@/utils/dynamicPricingUtils';
import {
  Vehicle,
  Service,
  serviceCategories,
  getAvailableServicesForVehicle,
  formatPrice,
  getServicesByCategory,
} from '@/data/pricing';
import { format } from 'date-fns';

interface ServiceSelectorProps {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

interface ServiceItemProps {
  service: Service;
  vehicle: Vehicle;
  onAddToCart: (serviceId: string, date: string, time: string, price: number) => void;
}

function ServiceItem({ service, vehicle, onAddToCart }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Dynamic pricing states
  const [price, setPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  
  // Check if selected date is in Ramadan pricing period
  const { isRamadanPricingDate, loading: ramadanLoading } = useIsDateRamadanPricingPeriod(selectedDate || null);

  // Fetch price when date changes
  useEffect(() => {
    const fetchPrice = async () => {
      if (!selectedDate) {
        setPrice(null);
        return;
      }

      setLoadingPrice(true);
      try {
        const fetchedPrice = await getPriceForServiceOnDate(
          vehicle.id,
          service.id,
          selectedDate
        );
        setPrice(fetchedPrice);
      } catch (error) {
        console.error('Error fetching price:', error);
        setPrice(null);
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [selectedDate, vehicle.id, service.id]);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  }, []);

  const formatTimeDisplay = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || !price) {
      toast.error('Please select both date and time');
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(
        service.id,
        selectedDate.toISOString().split('T')[0],
        selectedTime,
        price
      );
      setIsAdding(false);
      setSelectedDate(undefined);
      setSelectedTime('');
      setPrice(null);
      toast.success('Added to cart!', {
        description: `${service.name} with ${vehicle.name}`,
      });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className={`border transition-all duration-300 ${
        isRamadanPricingDate && selectedDate
          ? 'border-gold/50 hover:border-gold shadow-md'
          : 'border-border/50 hover:border-gold/50 hover:shadow-md'
      }`}>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            {/* Service Info */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{service.name}</h4>
                  {service.popular && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gold/20 text-gold-dark rounded">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{service.nameAr}</p>
              </div>
              <div className="text-right">
                {loadingPrice || ramadanLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                  </div>
                ) : price ? (
                  <div className="flex flex-col items-end gap-1">
                    {isRamadanPricingDate && (
                      <span className="text-xs font-semibold text-gold-dark bg-gold/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>🌙</span>
                        Ramadan
                      </span>
                    )}
                    <p className={`font-display text-xl font-bold ${
                      isRamadanPricingDate ? 'text-gold-dark' : 'text-emerald'
                    }`}>
                      {formatPrice(price)}
                    </p>
                  </div>
                ) : selectedDate ? (
                  <p className="text-sm text-muted-foreground">Price unavailable</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Select date</p>
                )}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Date Picker */}
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`flex-1 justify-start text-left font-normal ${
                      selectedDate ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Time Picker */}
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="flex-1">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {selectedTime ? formatTimeDisplay(selectedTime) : 'Select time'}
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {formatTimeDisplay(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedDate || !selectedTime || isAdding || loadingPrice || !price}
                className={`min-w-[120px] ${
                  isRamadanPricingDate && selectedDate
                    ? 'bg-gold hover:bg-gold/90 text-foreground'
                    : 'bg-emerald hover:bg-emerald/90 text-white'
                }`}
              >
                {isAdding ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Ramadan Pricing Info */}
            {isRamadanPricingDate && selectedDate && (
              <div className="flex items-start gap-2 p-2 bg-gold/10 border border-gold/30 rounded text-xs">
                <span className="text-base flex-shrink-0">ℹ️</span>
                <p className="text-gold-dark">
                  <strong>Ramadan pricing</strong> is applied for this date. Prices are adjusted for the blessed month.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ServiceSelector({ vehicle, open, onClose }: ServiceSelectorProps) {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const availableServices = useMemo(() => {
    if (!vehicle) return [];
    return getAvailableServicesForVehicle(vehicle.id);
  }, [vehicle]);

  const filteredServices = useMemo(() => {
    let services = availableServices;

    // Filter by category
    if (selectedCategory !== 'all') {
      services = services.filter((s) => s.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      services = services.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.nameAr.includes(query)
      );
    }

    return services;
  }, [availableServices, selectedCategory, searchQuery]);

  const handleAddToCart = (serviceId: string, date: string, time: string, price: number) => {
    if (!vehicle) return;
    addItem({
      vehicleId: vehicle.id,
      serviceId,
      date,
      time,
      price,
    });
  };

  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-display text-2xl">
            Select Services for {vehicle.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {vehicle.type} • {vehicle.capacity} Passengers
          </p>
        </DialogHeader>

        {/* Info Banner */}
        <div className="flex items-start gap-2 p-3 bg-emerald/10 border border-emerald/30 rounded-lg text-sm flex-shrink-0">
          <span className="text-lg flex-shrink-0">💡</span>
          <p className="text-emerald-dark">
            Prices are calculated based on your selected date. Ramadan pricing applies automatically during the blessed month.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 py-4 border-b flex-shrink-0">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {serviceCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  vehicle={vehicle}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <p>No services found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
