/*
  DESIGN: Desert Oasis Luxury
  - Section with arabesque pattern background
  - Golden line accent under heading
  - Responsive grid layout
*/

import { motion } from 'framer-motion';
import { vehicles, Vehicle } from '@/data/pricing';
import VehicleCard from './VehicleCard';

interface VehicleFleetProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export default function VehicleFleet({ onSelectVehicle }: VehicleFleetProps) {
  return (
    <section id="vehicles" className="py-20 md:py-28 bg-sand arabesque-pattern">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-4">
            Our Fleet
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Vehicle
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our premium fleet of vehicles, each maintained to the highest standards 
            for your comfort and safety during your sacred journey.
          </p>
        </motion.div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
