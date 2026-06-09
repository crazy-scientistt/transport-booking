/*
  DESIGN: Desert Oasis Luxury
  - Modal for service selection
  - Each service has its own date/time picker
  - Gold accents on selected items
*/

import { useState, useMemo } from 'react';
import { Calendar, Clock, Plus, Check, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import {
  Vehicle,
  Service,
  serviceCategories,
  getAvailableServicesForVehicle,
  getPrice,
  formatPrice,
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

const TIME_SLOTS = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minute = index % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});


function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function formatDateForStorage(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTimeDisplay(time: string) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function ServiceItem({ service, vehicle, onAddToCart }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const price = getPrice(vehicle.id, service.id);

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || price === null) {
      toast.error('Please select both date and time');
      return;
    }

    setIsAdding(true);
    window.setTimeout(() => {
      onAddToCart(
        service.id,
        formatDateForStorage(selectedDate),
        selectedTime,
        price
      );
      setIsAdding(false);
      setSelectedDate(undefined);
      setSelectedTime('');
      toast.success('Added to cart!', {
        description: `${service.name} with ${vehicle.name}`,
      });
    }, 150);
  };

  if (price === null) return null;

  return (
    <Card className="border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
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
              <p className="font-display text-xl font-bold text-emerald whitespace-nowrap">
                {formatPrice(price)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
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
                  disabled={isPastDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {selectedTime ? formatTimeDisplay(selectedTime) : 'Select time'}
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {formatTimeDisplay(time)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleAddToCart}
              disabled={!selectedDate || !selectedTime || isAdding}
              className="bg-emerald hover:bg-emerald/90 text-white min-w-[120px]"
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
        </div>
      </CardContent>
    </Card>
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

    if (selectedCategory !== 'all') {
      services = services.filter((s) => s.category === selectedCategory);
    }

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

        <div className="flex flex-col sm:flex-row gap-3 py-4 border-b flex-shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

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

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
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
            <div className="text-center py-12 text-muted-foreground">
              <p>No services found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
