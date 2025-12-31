'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Clock, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_MENU = {
  title: 'Our Menu',
  subtitle: 'Discover our carefully crafted selection',
  searchPlaceholder: 'Search menu items...',
  ctaText: 'Order Now',
  ctaHref: '/order',
  // TODO: Move to /data/menu-items.ts when ready
  menuItems: [
    {
      id: '1',
      name: 'Artisan Coffee Blend',
      description: 'Rich, full-bodied coffee with notes of chocolate and caramel',
      price: '$4.50',
      category: 'Beverages',
      prepTime: '3 min',
      rating: 4.8,
      imageUrl:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Artisan coffee in white cup',
    },
    {
      id: '2',
      name: 'Grilled Salmon Bowl',
      description: 'Fresh Atlantic salmon with quinoa, avocado, and seasonal vegetables',
      price: '$18.95',
      category: 'Mains',
      prepTime: '15 min',
      rating: 4.9,
      imageUrl:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Grilled salmon bowl with vegetables',
    },
    {
      id: '3',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: '$8.50',
      category: 'Desserts',
      prepTime: '8 min',
      rating: 4.7,
      imageUrl:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Chocolate lava cake with ice cream',
    },
  ],
} as const;

type MenuProps = Partial<typeof DEFAULT_MENU>;

export default function Menu(props: MenuProps) {
  const config = { ...DEFAULT_MENU, ...props };
  const navigate = useSmartNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = config.menuItems.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="menu" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Search Field */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-card text-card-foreground border-border"
              data-editable="searchPlaceholder"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <Card
              key={item.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  data-editable-src={`menuItems[${idx}].imageUrl`}
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <span data-editable={`menuItems[${idx}].category`}>{item.category}</span>
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`menuItems[${idx}].name`}>{item.name}</span>
                  </h3>
                  <span className="text-lg font-bold text-primary">
                    <span data-editable={`menuItems[${idx}].price`}>{item.price}</span>
                  </span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  <span data-editable={`menuItems[${idx}].description`}>{item.description}</span>
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span data-editable={`menuItems[${idx}].prepTime`}>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span data-editable={`menuItems[${idx}].rating`}>{item.rating}</span>
                  </div>
                </div>

                <Button
                  onClick={handleOrderClick}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span data-editable="ctaText">{config.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No menu items found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
