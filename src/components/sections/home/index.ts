'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';

const DEFAULT_MENU = {
  title: 'Our Menu',
  subtitle: 'Discover our carefully crafted selection',
  searchPlaceholder: 'Search menu items...',
  menuItems: [
    {
      id: '1',
      name: 'Artisan Coffee Blend',
      description: 'Rich, full-bodied coffee with notes of chocolate and caramel',
      price: '$4.50',
      category: 'Beverages',
      imageUrl:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Artisan coffee in ceramic cup',
      prepTime: '3 min',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Grilled Salmon Bowl',
      description: 'Fresh Atlantic salmon with quinoa, avocado, and seasonal vegetables',
      price: '$18.95',
      category: 'Mains',
      imageUrl:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Grilled salmon bowl with vegetables',
      prepTime: '15 min',
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: '$8.75',
      category: 'Desserts',
      imageUrl:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=80',
      imageAlt: 'Chocolate lava cake with ice cream',
      prepTime: '8 min',
      rating: 4.7,
    },
  ],
} as const;

type MenuProps = Partial<typeof DEFAULT_MENU>;

export default function Menu(props: MenuProps) {
  const config = { ...DEFAULT_MENU, ...props };
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return config.menuItems;

    const term = searchTerm.toLowerCase();
    return config.menuItems.filter(
      item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchTerm, config.menuItems]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(config.menuItems.map(item => item.category))];
    return uniqueCategories;
  }, [config.menuItems]);

  return (
    <section id="menu" className="bg-background text-foreground py-16 sm:py-20">
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
              className="pl-10 bg-card border-border focus:ring-ring"
              data-editable="searchPlaceholder"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge
            variant={searchTerm === '' ? 'default' : 'secondary'}
            className="cursor-pointer transition-colors"
            onClick={() => setSearchTerm('')}
          >
            All Items
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={
                searchTerm.toLowerCase() === category.toLowerCase() ? 'default' : 'secondary'
              }
              className="cursor-pointer transition-colors"
              onClick={() => setSearchTerm(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium" data-editable={`menuItems[${idx}].rating`}>
                    {item.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`menuItems[${idx}].name`}>{item.name}</span>
                  </h3>
                  <span
                    className="text-lg font-bold text-primary"
                    data-editable={`menuItems[${idx}].price`}
                  >
                    {item.price}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  <span data-editable={`menuItems[${idx}].description`}>{item.description}</span>
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <span data-editable={`menuItems[${idx}].category`}>{item.category}</span>
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span data-editable={`menuItems[${idx}].prepTime`}>{item.prepTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No menu items found matching "{searchTerm}"</p>
              <p className="text-sm mt-2">Try searching for something else or browse all items</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
