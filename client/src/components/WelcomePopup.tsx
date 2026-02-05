/*
  DESIGN: Desert Oasis Luxury
  - Welcome modal for quick booking
  - Shows all vehicles with one service selection
  - Elegant card-based layout
  - Link to main site for multiple bookings
  
  ✨ UPDATED: Now uses dynamic Ramadan pricing based on selected date
*/

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Calendar, Clock, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { useIsDateRamadanPricingPeriod } from '@/contexts/RamadanContext';
import { getPriceForServiceOnDate } from '@/utils/dynamicPricingUtils';
import {
  vehicles,
  Vehicle,
  getAvailableServicesForVehicle,
  formatPrice,
} from '@/data/pricing';
import { format } from 'date-fns';

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
  onBrowseMore: () => void;
}

export default function WelcomePopup({ open, onClose, onBrowseMore }: WelcomePopupProps) {
  const { addItem } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [step, setStep] = useState<'vehicle' | 'service'>('vehicle');
  
  // Dynamic pricing state
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  
  // Check if selected date is in Ramadan pricing period
  const { isRamadanPricingDate, loading: ramadanLoading } = useIsDateRamadanPricingPeriod(selectedDate || null);

  const availableServices = useMemo(() => {
    if (!selectedVehicle) return [];
    return getAvailableServicesForVehicle(selectedVehicle.id);
  }, [selectedVehicle]);

  // Recalculate price when vehicle, service, or date changes
  useEffect(() => {
    const fetchPrice = async () => {
      if (!selectedVehicle || !selectedServiceId || !selectedDate) {
        setSelectedPrice(null);
        return;
      }

      setLoadingPrice(true);
      try {
        const price = await getPriceForServiceOnDate(
          selectedVehicle.id,
          selectedServiceId,
          selectedDate
        );
        setSelectedPrice(price);
      } catch (error) {
        console.error('Error fetching price:', error);
        toast.error('Failed to load price');
        setSelectedPrice(null);
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [selectedVehicle, selectedServiceId, selectedDate]);

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

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedServiceId('');
    setSelectedPrice(null);
    setStep('service');
  };

  const handleBookNow = () => {
    if (!selectedVehicle || !selectedServiceId || !selectedDate || !selectedTime || !selectedPrice) {
      toast.error('Please complete all selections');
      return;
    }

    addItem({
      vehicleId: selectedVehicle.id,
      serviceId: selectedServiceId,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      price: selectedPrice,
    });

    toast.success('Added to cart!', {
      description: 'Your service has been added. You can add more from the main site.',
    });

    onClose();
  };

  const handleBrowseMore = () => {
    onClose();
    onBrowseMore();
  };

  const resetAndClose = () => {
    setSelectedVehicle(null);
    setSelectedServiceId('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedPrice(null);
    setStep('vehicle');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && resetAndClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-emerald to-emerald/80 text-white">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-gold fill-gold" />
            <span className="text-sm font-medium text-white/90">Quick Booking</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Welcome to Premium Transport
          </h2>
          <p className="text-white/80 mt-2">
            Book your transportation service in just a few clicks
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'vehicle' ? (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6"
            >
              <h3 className="font-display text-lg font-semibold mb-4">Select Your Vehicle</h3>
              <ScrollArea className="h-[60vh] sm:h-[400px] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <motion.button
                      key={vehicle.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-gold transition-all text-left"
                    >
                      <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-sand">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-contain object-top sm:object-cover sm:object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-emerald transition-colors">
                              {vehicle.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Users className="w-4 h-4" />
                              <span>{vehicle.capacity} Passengers</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                      {vehicle.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-gold text-foreground text-xs font-semibold rounded">
                          Popular
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          ) : (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              {/* Back Button */}
              <button
                onClick={() => setStep('vehicle')}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to vehicles
              </button>

              {/* Selected Vehicle */}
              {selectedVehicle && (
                <div className="flex items-center gap-4 p-4 bg-sand rounded-lg mb-6">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{selectedVehicle.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedVehicle.type} • {selectedVehicle.capacity} Passengers
                    </p>
                  </div>
                </div>
              )}

              {/* Service Selection */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Service</label>
                  <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {availableServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex justify-between items-center w-full gap-4">
                            <span>{service.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Select a date below to see pricing
                  </p>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Date</label>
                    <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            selectedDate ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
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
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {selectedTime ? formatTimeDisplay(selectedTime) : 'Pick a time'}
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
                  </div>
                </div>

                {/* Price Display */}
                {selectedDate && selectedServiceId && (
                  <div className="relative overflow-hidden">
                    {loadingPrice || ramadanLoading ? (
                      <div className="flex justify-between items-center p-4 bg-sand rounded-lg">
                        <span className="font-medium">Calculating price...</span>
                        <div className="w-6 h-6 border-2 border-emerald border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : selectedPrice ? (
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        isRamadanPricingDate 
                          ? 'bg-gradient-to-br from-gold/20 to-gold/10 border-gold/40' 
                          : 'bg-emerald/10 border-emerald/30'
                      }`}>
                        {isRamadanPricingDate && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🌙</span>
                            <span className="text-xs font-semibold text-gold-dark bg-gold/30 px-2 py-0.5 rounded-full">
                              Ramadan Pricing Active
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Service Price</span>
                          <span className={`font-display text-2xl font-bold ${
                            isRamadanPricingDate ? 'text-gold-dark' : 'text-emerald'
                          }`}>
                            {formatPrice(selectedPrice)}
                          </span>
                        </div>
                        {isRamadanPricingDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Special pricing for Ramadan period
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <span className="font-medium text-red-600">Price unavailable</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleBookNow}
                    disabled={!selectedServiceId || !selectedDate || !selectedTime || !selectedPrice || loadingPrice}
                    className="flex-1 bg-emerald hover:bg-emerald/90 text-white font-semibold py-6"
                  >
                    Add to Cart
                  </Button>
                </div>

                {/* Browse More Link */}
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Need to book multiple services?
                  </p>
                  <button
                    onClick={handleBrowseMore}
                    className="inline-flex items-center gap-1 text-emerald hover:text-emerald/80 font-medium transition-colors"
                  >
                    Browse all services on our website
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
