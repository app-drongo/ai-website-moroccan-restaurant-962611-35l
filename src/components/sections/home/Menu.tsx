'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_MENU = {
  title: 'Our Business Menu',
  subtitle: 'Professional Services & Solutions',
  description:
    "Discover our comprehensive range of business services designed to help your company grow and succeed in today's competitive market.",
  searchPlaceholder: 'Search services...',
  categories: [
    {
      name: 'Consulting',
      items: [
        {
          id: 1,
          name: 'Strategic Business Planning',
          description:
            'Comprehensive business strategy development with market analysis, competitive positioning, and growth roadmaps.',
          price: '$2,500',
          image:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
          rating: 4.9,
          isPopular: true,
          dietary: ['Premium'],
        },
        {
          id: 2,
          name: 'Digital Transformation',
          description:
            'Guide your business through digital modernization with technology integration and process optimization.',
          price: '$3,200',
          image:
            'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
          rating: 4.8,
          isPopular: true,
          dietary: ['Tech-Focused'],
        },
        {
          id: 3,
          name: 'Operations Optimization',
          description:
            'Streamline your business operations for maximum efficiency and cost reduction through process analysis.',
          price: '$1,800',
          image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
          rating: 4.7,
          isPopular: false,
          dietary: ['Efficiency'],
        },
      ],
    },
    {
      name: 'Marketing',
      items: [
        {
          id: 4,
          name: 'Brand Development Package',
          description:
            'Complete brand identity creation including logo design, brand guidelines, and market positioning strategy.',
          price: '$4,500',
          image:
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80',
          rating: 4.9,
          isPopular: true,
          dietary: ['Creative'],
        },
        {
          id: 5,
          name: 'Digital Marketing Campaign',
          description:
            'Multi-channel digital marketing strategy with social media, content marketing, and paid advertising.',
          price: '$2,800',
          image:
            'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&q=80',
          rating: 4.6,
          isPopular: false,
          dietary: ['Digital'],
        },
      ],
    },
    {
      name: 'Technology',
      items: [
        {
          id: 6,
          name: 'Custom Software Development',
          description:
            'Tailored software solutions built to meet your specific business requirements and workflow needs.',
          price: '$8,500',
          image:
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80',
          rating: 4.8,
          isPopular: false,
          dietary: ['Custom'],
        },
        {
          id: 7,
          name: 'Cloud Migration Services',
          description:
            'Seamless transition to cloud infrastructure with security, scalability, and cost optimization.',
          price: '$5,200',
          image:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
          rating: 4.7,
          isPopular: true,
          dietary: ['Cloud'],
        },
      ],
    },
    {
      name: 'Support',
      items: [
        {
          id: 8,
          name: 'Business Process Training',
          description:
            'Comprehensive staff training programs to maximize efficiency and adoption of new systems.',
          price: '$1,200',
          image:
            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
          rating: 4.5,
          isPopular: true,
          dietary: ['Training'],
        },
        {
          id: 9,
          name: 'Ongoing Support Package',
          description:
            'Monthly retainer for continuous business support, maintenance, and strategic guidance.',
          price: '$800/mo',
          image:
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&q=80',
          rating: 4.6,
          isPopular: false,
          dietary: ['Ongoing'],
        },
      ],
    },
  ],
  ctaText: 'Get Quote',
  ctaHref: '/quote',
  secondaryCtaText: 'Schedule Consultation',
  secondaryCtaHref: '/consultation',
} as const;

type MenuProps = Partial<typeof DEFAULT_MENU>;

export default function Menu(props: MenuProps) {
  const config = { ...DEFAULT_MENU, ...props };
  const navigate = useSmartNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all items for search
  const allItems = useMemo(() => {
    return config.categories.flatMap(category =>
      category.items.map(item => ({ ...item, category: category.name }))
    );
  }, [config.categories]);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let items = allItems;

    // Filter by search term
    if (searchTerm) {
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  }, [allItems, searchTerm, selectedCategory]);

  // Get unique categories for filter
  const categories = ['All', ...config.categories.map(cat => cat.name)];

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="menu" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <h3 className="text-xl sm:text-2xl text-muted-foreground mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="description">{config.description}</span>
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={config.searchPlaceholder}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
                data-editable="searchPlaceholder"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {filteredItems.map(item => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  data-editable-src={`item-${item.id}-image`}
                />
                {item.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-xl font-semibold text-foreground"
                    data-editable={`item-${item.id}-name`}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-xl font-bold text-primary"
                    data-editable={`item-${item.id}-price`}
                  >
                    {item.price}
                  </span>
                </div>
                <p
                  className="text-muted-foreground mb-4 leading-relaxed"
                  data-editable={`item-${item.id}-description`}
                >
                  {item.description}
                </p>
                {item.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((diet, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                )}
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
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

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
