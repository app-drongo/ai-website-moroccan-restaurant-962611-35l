'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_MENU = {
  title: 'Our Menu',
  subtitle: 'Carefully Crafted Dishes',
  description:
    'Explore our selection of thoughtfully prepared dishes, made with the finest ingredients and attention to detail.',
  searchPlaceholder: 'Search menu items...',
  categories: [
    {
      name: 'Mains',
      items: [
        {
          id: 1,
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with seasonal vegetables and lemon herb butter.',
          price: '$28',
          image:
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop&q=80',
          rating: 4.8,
          isPopular: true,
          dietary: ['Gluten-Free'],
        },
        {
          id: 2,
          name: 'Ribeye Steak',
          description: 'Premium cut ribeye with roasted potatoes and market vegetables.',
          price: '$42',
          image:
            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80',
          rating: 4.9,
          isPopular: true,
          dietary: ['Gluten-Free'],
        },
        {
          id: 3,
          name: 'Pasta Primavera',
          description: 'House-made pasta with seasonal vegetables in a light cream sauce.',
          price: '$22',
          image:
            'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop&q=80',
          rating: 4.6,
          isPopular: false,
          dietary: ['Vegetarian'],
        },
      ],
    },
    {
      name: 'Appetizers',
      items: [
        {
          id: 4,
          name: 'Charcuterie Board',
          description: 'Selection of artisanal meats, cheeses, and accompaniments.',
          price: '$18',
          image:
            'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=800&h=600&fit=crop&q=80',
          rating: 4.7,
          isPopular: true,
          dietary: [],
        },
        {
          id: 5,
          name: 'Burrata Salad',
          description: 'Fresh burrata with heirloom tomatoes, basil, and balsamic reduction.',
          price: '$16',
          image:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&q=80',
          rating: 4.5,
          isPopular: false,
          dietary: ['Vegetarian', 'Gluten-Free'],
        },
      ],
    },
    {
      name: 'Desserts',
      items: [
        {
          id: 6,
          name: 'Chocolate Tart',
          description: 'Rich dark chocolate tart with raspberry coulis and fresh berries.',
          price: '$12',
          image:
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&q=80',
          rating: 4.8,
          isPopular: true,
          dietary: ['Vegetarian'],
        },
        {
          id: 7,
          name: 'Lemon Panna Cotta',
          description: 'Silky smooth panna cotta with lemon zest and seasonal fruit.',
          price: '$10',
          image:
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop&q=80',
          rating: 4.4,
          isPopular: false,
          dietary: ['Vegetarian', 'Gluten-Free'],
        },
      ],
    },
  ],
} as const;

type MenuProps = Partial<typeof DEFAULT_MENU>;

export default function Menu(props: MenuProps) {
  const config = { ...DEFAULT_MENU, ...props };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all unique categories
  const categories = ['All', ...config.categories.map(cat => cat.name)];

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let allItems = config.categories.flatMap(category =>
      category.items.map(item => ({ ...item, category: category.name }))
    );

    // Filter by category
    if (selectedCategory !== 'All') {
      allItems = allItems.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      allItems = allItems.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.dietary.some(diet => diet.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return allItems;
  }, [searchTerm, selectedCategory, config.categories]);

  return (
    <section id="menu" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={config.searchPlaceholder}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
                data-editable="searchPlaceholder"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-editable-src={`item-${item.id}-image`}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.isPopular && (
                    <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                  )}
                  {item.dietary.map(diet => (
                    <Badge key={diet} variant="secondary" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-xl font-semibold line-clamp-2"
                    data-editable={`item-${item.id}-name`}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-2xl font-bold text-primary ml-4"
                    data-editable={`item-${item.id}-price`}
                  >
                    {item.price}
                  </span>
                </div>

                <p
                  className="text-muted-foreground mb-4 line-clamp-3"
                  data-editable={`item-${item.id}-description`}
                >
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No dishes found matching your search.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
