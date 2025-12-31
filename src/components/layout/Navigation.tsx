'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'Riad Marrakech',
  brandTagline: 'Authentic Moroccan Cuisine',
  menuItems: [{ label: 'Home', href: '#hero' }],
  reservationText: 'Reserve Table',
  reservationHref: '#reservations',
  phoneNumber: '+1 (555) 123-4567',
  phoneText: 'Call Now',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleReservationClick = () => {
    navigate(config.reservationHref);
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${config.phoneNumber}`;
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <span
                data-editable="brandName"
                className="text-xl lg:text-2xl font-bold text-primary"
              >
                {config.brandName}
              </span>
              <span
                data-editable="brandTagline"
                className="text-xs lg:text-sm text-muted-foreground hidden sm:block"
              >
                {config.brandTagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <div className="flex space-x-6">
              {config.menuItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`menuItems[${idx}].href`}
                  data-href={item.href}
                  className="text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                >
                  <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                </Button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePhoneClick}
                className="hidden xl:flex border-primary/20 text-primary hover:bg-primary/10"
              >
                <span data-editable="phoneText">{config.phoneText}</span>
              </Button>

              <Button
                onClick={handleReservationClick}
                data-editable-href="reservationHref"
                data-href={config.reservationHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
              >
                <span data-editable="reservationText">{config.reservationText}</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-accent/50"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 bg-card text-card-foreground border-border"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                      <span data-editable="brandName" className="text-xl font-bold text-primary">
                        {config.brandName}
                      </span>
                      <p
                        data-editable="brandTagline"
                        className="text-sm text-muted-foreground mt-1"
                      >
                        {config.brandTagline}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <div className="space-y-2">
                      {config.menuItems.map((item, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`menuItems[${idx}].href`}
                          data-href={item.href}
                          className="w-full justify-start text-left h-12 text-base hover:bg-accent/50 hover:text-primary"
                        >
                          <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-6 border-t border-border space-y-3">
                    <Button
                      variant="outline"
                      onClick={handlePhoneClick}
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <span data-editable="phoneText">{config.phoneText}</span>
                    </Button>

                    <Button
                      onClick={handleReservationClick}
                      data-editable-href="reservationHref"
                      data-href={config.reservationHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                    >
                      <span data-editable="reservationText">{config.reservationText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
