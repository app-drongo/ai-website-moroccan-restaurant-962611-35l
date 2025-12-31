'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Search, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'Riad Al-Maghrib',
  links: [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Contact', href: '/contact' },
  ],
  menuItems: [
    {
      id: '1',
      name: 'Tagine Royale',
      description: 'Traditional Moroccan stew with tender lamb, apricots, and aromatic spices',
      price: '$28',
      image:
        'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400&h=300&fit=crop&q=80',
      category: 'Main Course',
      prepTime: '25 min',
    },
    {
      id: '2',
      name: 'Couscous Berber',
      description: 'Fluffy semolina with seasonal vegetables and your choice of protein',
      price: '$24',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&q=80',
      category: 'Traditional',
      prepTime: '20 min',
    },
    {
      id: '3',
      name: 'Pastilla Royale',
      description: 'Delicate pastry filled with spiced pigeon, almonds, and cinnamon',
      price: '$32',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80',
      category: 'Specialty',
      prepTime: '30 min',
    },
  ],
  searchPlaceholder: 'Search menu items...',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    if (href === '#menu') {
      setShowMenu(!showMenu);
    } else {
      navigate(href);
      setShowMenu(false);
    }
    setIsOpen(false);
  };

  const filteredMenuItems = config.menuItems.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="navigation" className="relative">
      <nav
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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {config.links.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent/50 rounded-md"
                    data-editable-href={`links[${index}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`links[${index}].name`}>{link.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {config.links.map((link, index) => (
                      <button
                        key={link.name}
                        onClick={() => handleLinkClick(link.href)}
                        className="text-left text-foreground hover:text-primary px-4 py-3 text-lg font-medium transition-colors duration-200 hover:bg-accent/50 rounded-md"
                        data-editable-href={`links[${index}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`links[${index}].name`}>{link.name}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Search Field */}
            <div className="mb-6 max-w-md mx-auto">
              <div className="relative">
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
            </div>

            {/* Menu Items Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
              {filteredMenuItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="bg-card border-border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          data-editable-src={`menuItems[${index}].image`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-sm text-foreground truncate">
                            <span data-editable={`menuItems[${index}].name`}>{item.name}</span>
                          </h3>
                          <span className="text-primary font-bold text-sm ml-2">
                            <span data-editable={`menuItems[${index}].price`}>{item.price}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          <span data-editable={`menuItems[${index}].description`}>
                            {item.description}
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <span data-editable={`menuItems[${index}].category`}>
                              {item.category}
                            </span>
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span data-editable={`menuItems[${index}].prepTime`}>
                              {item.prepTime}
                            </span>
                          </div>
                        </div>
                      </div>
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

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30"
          onClick={() => setShowMenu(false)}
        />
      )}
    </section>
  );
}
