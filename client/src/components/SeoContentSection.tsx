import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedSeoPages, getSeoPageByPath, homeFaqs, routeHref } from '@/data/seoPages';
import { formatPrice, getPrice, getServiceById, vehicles } from '@/data/pricing';

function getStartingPrice(serviceIds: string[]): string | null {
  const prices = serviceIds.flatMap((serviceId) =>
    vehicles
      .map((vehicle) => getPrice(vehicle.id, serviceId))
      .filter((price): price is number => typeof price === 'number')
  );

  if (!prices.length) return null;
  return formatPrice(Math.min(...prices));
}

const homepageFaqs = homeFaqs;

export default function SeoContentSection() {
  const routePages = getFeaturedSeoPages(6);
  const pricePage = getSeoPageByPath('/umrah-taxi-prices');
  const familyPage = getSeoPageByPath('/private-umrah-taxi-for-family');
  const groupPage = getSeoPageByPath('/hiace-coaster-group-taxi-umrah');
  const resourcePages = [pricePage, familyPage, groupPage].filter(Boolean);

  return (
    <section id="routes" className="py-20 md:py-28 bg-ivory content-auto">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald/10 text-emerald text-sm font-medium mb-4">
            Popular Routes
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Private Umrah Taxi Routes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Book private taxi service for Jeddah Airport, Makkah, Madinah, Ziyarat tours,
            family transfers and group travel across the main Umrah routes in Saudi Arabia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {routePages.map((page) => {
            const service = getServiceById(page.serviceIds[0]);
            const startingPrice = getStartingPrice(page.serviceIds);

            return (
              <Card key={page.path} className="group border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-2">
                        {page.eyebrow}
                      </p>
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-emerald transition-colors">
                        <a href={routeHref(page.path)}>{page.h1}</a>
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service?.name ?? page.intro}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <span className="font-display text-lg font-semibold text-emerald">
                      {startingPrice ?? 'Confirm on WhatsApp'}
                    </span>
                  </div>
                </CardContent>
                <div className="h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-sand rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Popular Umrah taxi services
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Compare airport pickup, Makkah to Madinah travel, Ziyarat, family transfers
              and group booking options before confirming your ride on WhatsApp.
            </p>
            <div className="space-y-3">
              {[
                'Jeddah Airport to Makkah private taxi',
                'Makkah to Madinah hotel-to-hotel transfer',
                'Makkah and Madinah Ziyarat taxi service',
                'Family and group vehicles with luggage space',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {resourcePages.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                {resourcePages.map((page) => (
                  <a
                    key={page!.path}
                    href={routeHref(page!.path)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:text-emerald transition-colors"
                  >
                    {page!.h1}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold-dark flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Common questions</p>
                <h3 className="font-display text-2xl font-bold text-foreground">Umrah Taxi FAQ</h3>
              </div>
            </div>

            <div className="space-y-4">
              {homepageFaqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border bg-ivory p-4">
                  <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-emerald group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
