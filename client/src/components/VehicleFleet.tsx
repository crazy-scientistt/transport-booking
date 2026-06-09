/*
  DESIGN: Desert Oasis Luxury
  - Section with arabesque pattern background
  - Golden line accent under heading
  - Responsive grid layout
*/

import { vehicles, Vehicle } from '@/data/pricing';
import VehicleCard from './VehicleCard';

interface VehicleFleetProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export default function VehicleFleet({ onSelectVehicle }: VehicleFleetProps) {
  return (
    <section id="vehicles" className="py-20 md:py-28 bg-sand arabesque-pattern content-auto">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-4">
            Our Fleet
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Umrah Taxi Vehicle
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Select cars, vans, SUVs, Hiace, and Coaster vehicles for airport transfers,
            Makkah to Madinah trips, Ziyarat tours, and family Umrah travel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
