/*
  DESIGN: Desert Oasis Luxury
  - Service categories with icons
  - Elegant card layout
  - Gold accents on hover
*/

import { motion } from 'framer-motion';
import { Plane, Car, Building2, Train, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { serviceCategories } from '@/data/pricing';

const iconMap: Record<string, React.ReactNode> = {
  plane: <Plane className="w-8 h-8" />,
  car: <Car className="w-8 h-8" />,
  mosque: <Building2 className="w-8 h-8" />,
  train: <Train className="w-8 h-8" />,
  'map-pin': <MapPin className="w-8 h-8" />,
  clock: <Clock className="w-8 h-8" />,
};

interface ServicesSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

export default function ServicesSection({ onCategoryClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-ivory">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold-dark text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transportation Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From airport transfers to sacred site visits, we offer comprehensive transportation 
            solutions for your entire journey in Saudi Arabia.
          </p>
        </motion.div>

        {/* Service Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                onClick={() => onCategoryClick(category.id)}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-4 group-hover:bg-emerald group-hover:text-white transition-all duration-300">
                        {iconMap[category.icon]}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-emerald transition-colors">
                        {category.name}
                      </h3>

                      {/* Arabic Name */}
                      <p className="text-sm text-muted-foreground font-arabic">
                        {category.nameAr}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald group-hover:translate-x-1 transition-all mt-2" />
                  </div>
                </CardContent>

                {/* Gold accent line */}
                <div className="h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Click on any category to view available services and pricing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
