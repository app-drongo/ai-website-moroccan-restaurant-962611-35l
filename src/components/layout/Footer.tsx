'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  restaurantName: 'Riad Al-Maghrib',
  description:
    'Authentic Moroccan cuisine in the heart of the city. Experience the rich flavors and warm hospitality of Morocco.',
  address: '123 Heritage Street, Downtown District',
  phone: '(555) 123-4567',
  email: 'info@riadalmaghrib.com',
  hours: {
    weekdays: 'Mon-Thu: 5:00 PM - 10:00 PM',
    weekend: 'Fri-Sun: 5:00 PM - 11:00 PM',
  },
  quickLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Contact', href: '/contact' },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ],
  copyright: '© 2024 Riad Al-Maghrib. All rights reserved.',
  menuItems: [
    {
      name: 'Tagine Royale',
      description: 'Traditional slow-cooked lamb with apricots and almonds',
      imageUrl:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop&q=80',
      imageAlt: 'Moroccan tagine dish',
    },
    {
      name: 'Couscous Berber',
      description: 'Fluffy semolina with seven vegetables and tender meat',
      imageUrl:
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop&q=80',
      imageAlt: 'Traditional couscous dish',
    },
    {
      name: 'Pastilla Royale',
      description: 'Delicate pastry filled with spiced pigeon and almonds',
      imageUrl:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&q=80',
      imageAlt: 'Moroccan pastilla',
    },
  ],
  searchPlaceholder: 'Search menu items...',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const filteredMenuItems = config.menuItems.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <footer id="footer" className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Menu Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Featured Menu</h3>

          {/* Search Field */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
              data-editable="searchPlaceholder"
            />
          </div>

          {/* Menu Items Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredMenuItems.map((item, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    data-editable-src={`menuItems[${index}].imageUrl`}
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-card-foreground mb-2">
                    <span data-editable={`menuItems[${index}].name`}>{item.name}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable={`menuItems[${index}].description`}>
                      {item.description}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMenuItems.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No menu items found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 border-t border-border pt-8">
          {/* Restaurant Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4">
              <span data-editable="restaurantName">{config.restaurantName}</span>
            </h3>
            <p className="mb-6 leading-relaxed">
              <span data-editable="description">{config.description}</span>
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span data-editable="address">{config.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span data-editable="email">{config.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {config.quickLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`quickLinks[${index}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`quickLinks[${index}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Hours
            </h4>
            <div className="space-y-2 mb-6">
              <p>
                <span data-editable="hours.weekdays">{config.hours.weekdays}</span>
              </p>
              <p>
                <span data-editable="hours.weekend">{config.hours.weekend}</span>
              </p>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {config.socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${index}].href`}
                  data-href={social.href}
                >
                  {social.label === 'Facebook' && <Facebook className="h-4 w-4" />}
                  {social.label === 'Instagram' && <Instagram className="h-4 w-4" />}
                  {social.label === 'Twitter' && <Twitter className="h-4 w-4" />}
                  <span className="sr-only" data-editable={`socialLinks[${index}].label`}>
                    {social.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm">
            <span data-editable="copyright">{config.copyright}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
