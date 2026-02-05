/*
  DESIGN: Desert Oasis Luxury
  - Floating card effect with subtle shadows
  - Gold accent on hover
  - Smooth scale transition
  - Elegant typography
*/

import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Vehicle } from '@/data/pricing';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  index: number;
}

export default function VehicleCard({ vehicle, onSelect, index }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Featured Badge */}
        {vehicle.featured && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-foreground text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-sand">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <CardContent className="p-5 md:p-6">
          {/* Vehicle Type Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sand text-xs font-medium text-muted-foreground mb-2">
            {vehicle.type}
          </div>

          {/* Vehicle Name */}
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-emerald transition-colors">
            {vehicle.name}
          </h3>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{vehicle.capacity} Passengers</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
            {vehicle.description}
          </p>

          {/* Select Button */}
          <Button
            onClick={() => onSelect(vehicle)}
            className="w-full bg-emerald hover:bg-emerald/90 text-white font-semibold transition-all group-hover:bg-gold group-hover:text-foreground"
          >
            Select Vehicle
          </Button>
        </CardContent>

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );
}
