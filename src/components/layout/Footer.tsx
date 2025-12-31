'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  restaurantName: 'Riad Al-Maghrib',
  tagline: 'Authentic Moroccan flavors and hospitality in an elegant dining atmosphere',

  // Contact Information
  address: '123 Heritage Boulevard, Downtown District',
  city: 'Your City, State 12345',
  phone: '(555) 123-4567',
  email: 'reservations@riadalmaghrib.com',

  // Hours
  weekdayHours: 'Monday - Thursday: 5:00 PM - 10:00 PM',
  weekendHours: 'Friday - Sunday: 4:00 PM - 11:00 PM',
  closedDay: 'Closed Tuesdays for private events',

  // Navigation Links
  menuLinks: [
    { label: 'Traditional Tagines', href: '/menu#tagines' },
    { label: 'Couscous Specialties', href: '/menu#couscous' },
    { label: 'Mint Tea & Desserts', href: '/menu#beverages' },
  ],

  aboutLinks: [
    { label: 'Our Heritage', href: '/about' },
    { label: 'Private Dining', href: '/private-events' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ],

  // Social Media
  socialLinks: [
    { platform: 'Instagram', href: 'https://instagram.com/riadalmaghrib' },
    { platform: 'Facebook', href: 'https://facebook.com/riadalmaghrib' },
    { platform: 'OpenTable', href: 'https://opentable.com/riadalmaghrib' },
  ],

  // Legal
  copyright: '© 2024 Riad Al-Maghrib. All rights reserved.',
  privacyHref: '/privacy',
  termsHref: '/terms',

  // CTA
  reservationText: 'Make a Reservation',
  reservationHref: '/reservations',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleReservationClick = () => {
    navigate(config.reservationHref);
  };

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Restaurant Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">
              <span data-editable="restaurantName">{config.restaurantName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <span data-editable="tagline">{config.tagline}</span>
            </p>
            <Button
              onClick={handleReservationClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              data-editable-href="reservationHref"
              data-href={config.reservationHref}
            >
              <span data-editable="reservationText">{config.reservationText}</span>
            </Button>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Contact & Location</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div data-editable="address">{config.address}</div>
                  <div data-editable="city">{config.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground" data-editable="phone">
                  {config.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground" data-editable="email">
                  {config.email}
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Hours
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div data-editable="weekdayHours">{config.weekdayHours}</div>
              <div data-editable="weekendHours">{config.weekendHours}</div>
              <div className="text-accent-foreground font-medium" data-editable="closedDay">
                {config.closedDay}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Explore</h4>
            <div className="space-y-6">
              {/* Menu Links */}
              <div>
                <h5 className="text-sm font-medium text-foreground mb-3">Our Menu</h5>
                <ul className="space-y-2">
                  {config.menuLinks.map((link, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                        data-editable-href={`menuLinks[${idx}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`menuLinks[${idx}].label`}>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Links */}
              <div>
                <h5 className="text-sm font-medium text-foreground mb-3">Experience</h5>
                <ul className="space-y-2">
                  {config.aboutLinks.map((link, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                        data-editable-href={`aboutLinks[${idx}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`aboutLinks[${idx}].label`}>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-4">
              {config.socialLinks.map((social, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSocialClick(social.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                >
                  <span data-editable={`socialLinks[${idx}].platform`}>{social.platform}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => handleLinkClick(config.privacyHref)}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-editable-href="privacyHref"
              data-href={config.privacyHref}
            >
              Privacy Policy
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={() => handleLinkClick(config.termsHref)}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-editable-href="termsHref"
              data-href={config.termsHref}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
