'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Clock, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const DEFAULT_MENU = {
  title: 'Our Menu',
  subtitle: 'Discover our carefully crafted selection',
  searchPlaceholder: 'Search menu items...',
  menuItems: [
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs and lemon',
      price: '$24.99',
      category: 'Main Course',
      rating: '4.8',
      prepTime: '25 min',
      imageUrl:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Grilled salmon dish',
    },
    {
      id: '2',
      name: 'Truffle Pasta',
      description: 'Handmade pasta with black truffle and parmesan',
      price: '$28.99',
      category: 'Main Course',
      rating: '4.9',
      prepTime: '20 min',
      imageUrl:
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Truffle pasta dish',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with house-made dressing',
      price: '$16.99',
      category: 'Appetizer',
      rating: '4.7',
      prepTime: '10 min',
      imageUrl:
        'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Caesar salad',
    },
  ],
} as const;

type MenuProps = Partial<typeof DEFAULT_MENU>;

export default function Menu(props: MenuProps) {
  const config = { ...DEFAULT_MENU, ...props };
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = config.menuItems.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="menu" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-card text-card-foreground border-border focus:ring-ring"
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
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
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

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span data-editable={`menuItems[${idx}].rating`}>{item.rating}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span data-editable={`menuItems[${idx}].prepTime`}>{item.prepTime}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Add to Order
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
            <Button
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
