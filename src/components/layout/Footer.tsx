'use client';

import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  restaurantName: 'Riad Al-Maghrib',
  tagline: 'Authentic Moroccan Cuisine Since 1995',
  address: '123 Heritage Street, Downtown District',
  phone: '+1 (555) 123-4567',
  email: 'info@riadalmaghrib.com',
  hours: {
    weekdays: 'Monday - Thursday: 5:00 PM - 10:00 PM',
    weekends: 'Friday - Sunday: 5:00 PM - 11:00 PM'
  },
  quickLinks: [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Contact', href: '/contact' }
  ],
  socialLinks: [
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' }
  ],
  copyright: '© 2024 Riad Al-Maghrib. All rights reserved.'
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground" data-editable="restaurantName">
              {config.restaurantName}
            </h3>
            <p className="text-sm" data-editable="tagline">
              {config.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <p data-editable="address">{config.address}</p>
              <p data-editable="phone">{config.phone}</p>
              <p data-editable="email">{config.email}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Hours</h3>
            <div className="space-y-2 text-sm">
              <p data-editable="hours-weekdays">{config.hours.weekdays}</p>
              <p data-editable="hours-weekends">{config.hours.weekends}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {config.quickLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block text-sm hover:text-foreground transition-colors"
                  data-editable={`footer-link-${index}-name`}
                  data-editable-href={`footer-link-${index}-href`}
                  data-href={link.href}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="space-y-2">
              {config.socialLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block text-sm hover:text-foreground transition-colors"
                  data-editable={`social-link-${index}-name`}
                  data-editable-href={`social-link-${index}-href`}
                  data-href={link.href}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm" data-editable="copyright">
            {config.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}