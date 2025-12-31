'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Riad Al-Maghrib',
  subtitle: 'Authentic Moroccan Cuisine',
  description:
    'Experience the rich heritage of Morocco through our handcrafted tagines, aromatic couscous, and traditional recipes passed down through generations. Our elegant dining atmosphere brings the warmth of Moroccan hospitality to every meal.',
  ctaText: 'Reserve Your Table',
  ctaHref: '/reservations',
  secondaryCtaText: 'View Menu',
  secondaryCtaHref: '/menu',
  heroImageUrl:
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop',
  heroImageAlt: 'Elegant Moroccan restaurant interior with traditional lanterns and warm lighting',
  rating: '4.9',
  reviewCount: '250+',
  location: 'Downtown Heritage District',
  openHours: '5:00 PM - 11:00 PM',
  specialties: ['Traditional Tagines', 'Handmade Couscous', 'Moroccan Mint Tea'],
  accentText: 'Authentic Since 1995',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={config.heroImageUrl}
          alt={config.heroImageAlt}
          data-editable-src="heroImageUrl"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid gap-12 lg:grid-cols-2 items-center w-full">
          {/* Left Column - Main Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Accent Badge */}
            <Badge variant="secondary" className="bg-accent text-accent-foreground w-fit">
              <span data-editable="accentText">{config.accentText}</span>
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-light">
                <span data-editable="subtitle">{config.subtitle}</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-3">
              {config.specialties.map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="border-primary text-primary">
                  <span data-editable={`specialties[${idx}]`}>{specialty}</span>
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Rating Card */}
            <Card className="bg-card/90 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span
                      className="text-2xl font-bold text-card-foreground"
                      data-editable="rating"
                    >
                      {config.rating}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <span data-editable="reviewCount">{config.reviewCount}</span> Reviews
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="bg-card/90 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-card-foreground" data-editable="location">
                    {config.location}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Hours Card */}
            <Card className="bg-card/90 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Open Daily</div>
                    <div className="text-card-foreground font-medium" data-editable="openHours">
                      {config.openHours}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/80 to-transparent z-5" />
    </section>
  );
}
