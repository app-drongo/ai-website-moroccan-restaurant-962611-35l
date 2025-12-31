'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, X } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'Riad Al-Maghrib',
  links: [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
  ],
  ctaText: 'Reserve Table',
  ctaHref: '/reservations',
  menuItems: [
    {
      name: 'Tagine Chicken',
      description: 'Traditional Moroccan slow-cooked chicken with preserved lemons and olives',
      price: '$24',
      image:
        'https://images.unsplash.com/photo-1539906942736-374021d0f3fe?w=300&h=200&fit=crop&q=80',
    },
    {
      name: 'Couscous Royal',
      description: 'Fluffy couscous served with tender lamb, vegetables, and aromatic spices',
      price: '$28',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop&q=80',
    },
    {
      name: 'Pastilla',
      description: 'Delicate pastry filled with spiced pigeon, almonds, and cinnamon',
      price: '$22',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&q=80',
    },
  ],
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setShowMenu(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  const filteredMenuItems = config.menuItems.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav
      id="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleLinkClick('#hero')}
              className="text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <span data-editable="logo">{config.logo}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {config.links.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  if (link.label === 'Menu') {
                    setShowMenu(!showMenu);
                  } else {
                    handleLinkClick(link.href);
                  }
                }}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-editable={`links[${index}].label`}
                data-editable-href={`links[${index}].href`}
                data-href={link.href}
              >
                <span data-editable={`links[${index}].label`}>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <div className="text-xl font-bold text-foreground">
                    <span data-editable="logo">{config.logo}</span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    {config.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (link.label === 'Menu') {
                            setShowMenu(!showMenu);
                          } else {
                            handleLinkClick(link.href);
                          }
                        }}
                        className="text-left text-lg text-foreground hover:text-primary transition-colors"
                        data-editable={`links[${index}].label`}
                        data-editable-href={`links[${index}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`links[${index}].label`}>{link.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <Button
                    onClick={handleCtaClick}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    data-editable-href="ctaHref"
                    data-href={config.ctaHref}
                  >
                    <span data-editable="ctaText">{config.ctaText}</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Menu Dropdown */}
        {showMenu && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Search Field */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>

              {/* Menu Items Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenuItems.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video relative mb-3 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          data-editable-src={`menuItems[${index}].image`}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">
                            <span data-editable={`menuItems[${index}].name`}>{item.name}</span>
                          </h3>
                          <span className="text-primary font-bold">
                            <span data-editable={`menuItems[${index}].price`}>{item.price}</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span data-editable={`menuItems[${index}].description`}>
                            {item.description}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMenuItems.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  No menu items found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
