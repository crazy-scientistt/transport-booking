import { lazy, Suspense, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Clock, MapPin, MessageCircle, Route as RouteIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import VehicleFleet from '@/components/VehicleFleet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  buildWhatsAppUrl,
  contactSettings,
  formatPrice,
  getPrice,
  getServiceById,
  heroBannerImage,
  Vehicle,
  vehicles,
} from '@/data/pricing';
import { getRelatedSeoPages, routeHref, seoPages, SeoPage } from '@/data/seoPages';
import { pageToDocumentSeo, useDocumentSeo } from '@/lib/seo';

const ServiceSelector = lazy(() => import('@/components/ServiceSelector'));
const CartDrawer = lazy(() => import('@/components/CartDrawer'));
const WhatsAppConfirmation = lazy(() => import('@/components/WhatsAppConfirmation'));

interface SeoRoutePageProps {
  page: SeoPage;
}

function getVehiclePriceRows(serviceId: string) {
  return vehicles
    .map((vehicle) => ({ vehicle, price: getPrice(vehicle.id, serviceId) }))
    .filter((row): row is { vehicle: Vehicle; price: number } => row.price !== null);
}

function getStartingPrice(serviceId: string) {
  const prices = getVehiclePriceRows(serviceId).map((row) => row.price);
  return prices.length ? Math.min(...prices) : null;
}

function getRoutePageForService(serviceId: string) {
  return seoPages.find((candidate) => candidate.serviceIds.length === 1 && candidate.serviceIds[0] === serviceId);
}

function PriceTable({ page }: { page: SeoPage }) {
  const isSingleRoute = page.serviceIds.length === 1;

  if (isSingleRoute) {
    const serviceId = page.serviceIds[0];
    const service = getServiceById(serviceId);
    const rows = getVehiclePriceRows(serviceId);

    if (!service || rows.length === 0) return null;

    return (
      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white shadow-lg">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Vehicle prices for {service.name}</caption>
          <thead className="bg-sand text-foreground">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Vehicle</th>
              <th scope="col" className="px-5 py-4 font-semibold">Type</th>
              <th scope="col" className="px-5 py-4 font-semibold">Capacity</th>
              <th scope="col" className="px-5 py-4 font-semibold">Route Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map(({ vehicle, price }) => (
              <tr key={vehicle.id} className="hover:bg-sand/60 transition-colors">
                <td className="px-5 py-4 font-semibold text-foreground">{vehicle.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{vehicle.type}</td>
                <td className="px-5 py-4 text-muted-foreground">{vehicle.capacity} passengers</td>
                <td className="px-5 py-4 font-display text-lg font-bold text-emerald">
                  {formatPrice(price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const routeRows = page.serviceIds
    .map((serviceId) => {
      const service = getServiceById(serviceId);
      const fromPrice = getStartingPrice(serviceId);
      const routePage = getRoutePageForService(serviceId);
      if (!service || fromPrice === null) return null;
      return { service, fromPrice, routePage };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (routeRows.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {routeRows.map(({ service, fromPrice, routePage }) => (
        <Card key={service.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Starting from</p>
            <p className="font-display text-3xl font-bold text-emerald mb-4">{formatPrice(fromPrice)}</p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Compare vehicle options and confirm the final fare before booking.
            </p>
            {routePage ? (
              <a href={routeHref(routePage.path)} className="inline-flex items-center gap-2 text-emerald font-medium hover:gap-3 transition-all">
                View route details
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RelatedRoutes({ page }: { page: SeoPage }) {
  const relatedPages = getRelatedSeoPages(page);

  if (relatedPages.length === 0) return null;

  return (
    <section className="py-16 bg-sand arabesque-pattern content-auto">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold-dark text-sm font-medium mb-4">
            Related Routes
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Continue Planning Your Umrah Transport
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPages.map((route) => {
            const firstServiceId = route.serviceIds[0];
            const startingPrice = firstServiceId ? getStartingPrice(firstServiceId) : null;

            return (
              <a key={route.path} href={routeHref(route.path)} className="group block h-full">
                <Card className="h-full border-0 bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-emerald transition-colors mb-3">
                      {route.h1}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {route.description}
                    </p>
                    {startingPrice !== null && (
                      <p className="mt-4 text-sm font-semibold text-emerald">From {formatPrice(startingPrice)}</p>
                    )}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                      Open route
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function SeoRoutePage({ page }: SeoRoutePageProps) {
  useDocumentSeo(pageToDocumentSeo(page));

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [serviceSelectorOpen, setServiceSelectorOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const whatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(`Hello, I want to book ${page.h1}. Please confirm vehicle availability and price.`);
  }, [page.h1]);

  const firstServicePrice = page.serviceIds[0] ? getStartingPrice(page.serviceIds[0]) : null;

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setServiceSelectorOpen(true);
  };

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    setWhatsappModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header onCartClick={() => setCartDrawerOpen(true)} />

      <main>
        <section className="relative overflow-hidden bg-[#1C1C1E] pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 opacity-30">
            <img
              src={heroBannerImage}
              alt="Private Umrah taxi service in Saudi Arabia"
              className="w-full h-full object-cover"
              width={1920}
              height={1072}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          <div className="relative z-10 container">
            <div className="max-w-4xl">
              <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm mb-6 transition-colors">
                Home
                <ArrowRight className="w-4 h-4" />
                {page.eyebrow}
              </a>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-6 text-sm font-medium text-white/90">
                <RouteIcon className="w-4 h-4 text-gold" />
                {page.eyebrow}
              </span>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                {page.h1}
              </h1>

              <p className="font-body text-lg md:text-xl text-white/80 mb-8 max-w-3xl leading-relaxed">
                {page.intro}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {page.highlights.map((highlight) => (
                  <span key={highlight} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-white/85">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-foreground font-semibold px-8 py-6 text-lg">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Book on WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg">
                  <a href="#prices">View Prices</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-ivory content-auto">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-2">Service Areas</h2>
                    <p className="text-muted-foreground text-sm">Jeddah, Makkah, Madinah and Taif routes for Umrah pilgrims.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-2">24/7 Booking</h2>
                    <p className="text-muted-foreground text-sm">Confirm route, timing, passengers, luggage and vehicle on WhatsApp.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-2">Direct Contact</h2>
                    <a href={`tel:${contactSettings.phoneNumber}`} className="text-emerald font-semibold hover:text-gold-dark transition-colors">
                      {contactSettings.phoneNumber}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="prices" className="py-20 md:py-28 bg-sand arabesque-pattern content-auto">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-4">
                Prices
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {page.serviceIds.length === 1 ? `${page.h1} Prices` : page.h1}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                {firstServicePrice !== null
                  ? `Starting from ${formatPrice(firstServicePrice)}. Choose your vehicle by passenger count, luggage space and comfort.`
                  : 'Compare route prices and confirm the final fare before booking on WhatsApp.'}
              </p>
            </div>

            <PriceTable page={page} />
          </div>
        </section>

        <section className="py-20 md:py-28 bg-ivory content-auto">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold-dark text-sm font-medium mb-4">
                  Booking Details
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  What to Know Before You Book
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mb-8" />
                <div className="space-y-6">
                  {page.sections.map((section) => (
                    <div key={section.heading} className="bg-white rounded-2xl p-6 shadow-md">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">{section.heading}</h3>
                      <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C1C1E] text-white rounded-3xl p-6 md:p-8 shadow-xl sticky top-24">
                <div className="w-14 h-14 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Book This Route</h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  Send your route, date, pickup time, passenger count, luggage count and preferred vehicle.
                  The fare and vehicle availability can then be confirmed before booking.
                </p>
                <Button asChild className="bg-gold hover:bg-gold-dark text-foreground font-semibold w-full py-6 text-lg">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    WhatsApp {contactSettings.phoneNumber}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <VehicleFleet onSelectVehicle={handleSelectVehicle} />

        <section id="faq" className="py-20 md:py-28 bg-ivory content-auto">
          <div className="container">
            <div className="text-center mb-10 md:mb-14">
              <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold-dark text-sm font-medium mb-4">
                FAQs
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                Answers to common questions about this Umrah taxi route and booking process.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group bg-white rounded-2xl shadow-md border border-border/50 overflow-hidden">
                  <summary className="list-none cursor-pointer p-5 md:p-6 flex items-center justify-between gap-4 font-semibold text-foreground hover:text-emerald transition-colors">
                    <span>{faq.question}</span>
                    <span className="w-8 h-8 rounded-full bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedRoutes page={page} />
      </main>

      <Footer />

      <Suspense fallback={null}>
        {serviceSelectorOpen && selectedVehicle && (
          <ServiceSelector
            vehicle={selectedVehicle}
            open={serviceSelectorOpen}
            preferredServiceId={page.serviceIds[0]}
            onClose={() => {
              setServiceSelectorOpen(false);
              setSelectedVehicle(null);
            }}
          />
        )}

        {cartDrawerOpen && (
          <CartDrawer
            open={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            onCheckout={handleCheckout}
          />
        )}

        {whatsappModalOpen && (
          <WhatsAppConfirmation
            open={whatsappModalOpen}
            onClose={() => setWhatsappModalOpen(false)}
          />
        )}
      </Suspense>

      <FloatingWhatsApp />
    </div>
  );
}
