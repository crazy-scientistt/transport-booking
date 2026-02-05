/*
  DESIGN: Desert Oasis Luxury
  - Asymmetric layout with image
  - Trust indicators
  - Elegant typography
*/

import { motion } from 'framer-motion';
import { Shield, Clock, Users, Award, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safe & Reliable',
    description: 'All vehicles are regularly maintained and drivers are professionally trained.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Availability',
    description: 'Book your ride anytime, day or night. We are always here for you.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Professional Drivers',
    description: 'Experienced drivers who know the routes and respect your journey.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Premium Service',
    description: 'Comfortable vehicles and exceptional service for your sacred journey.',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Pilgrims' },
  { value: '50+', label: 'Vehicles' },
  { value: '5★', label: 'Rating' },
  { value: '24/7', label: 'Support' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-sand">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Trusted Partner for{' '}
              <span className="text-emerald">Sacred Journeys</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mb-6" />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With years of experience serving pilgrims and travelers in Saudi Arabia, 
              we understand the importance of reliable, comfortable, and respectful 
              transportation services. Our mission is to make your sacred journey 
              as smooth and memorable as possible.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg"
                >
                  <p className="font-display text-3xl md:text-4xl font-bold text-emerald mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Trust Points */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-display text-lg font-semibold mb-4">Why Choose Us?</h4>
              <ul className="space-y-3">
                {[
                  'Licensed and insured transportation',
                  'Clean and well-maintained vehicles',
                  'Competitive and transparent pricing',
                  'Easy WhatsApp booking process',
                  'Multilingual driver support',
                ].map((point, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
