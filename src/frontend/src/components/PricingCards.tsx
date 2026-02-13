import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function PricingCards() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = [
    {
      name: 'Lifetime Free Class Access',
      price: '₹500',
      period: 'one-time',
      description: 'Get lifetime access to our free recorded classes',
      features: [
        'Access to all recorded classes',
        'Lifetime validity',
        'Self-paced learning',
        'Basic learning materials',
        'Community forum access',
      ],
      popular: false,
    },
    {
      name: 'Personal Classes',
      price: '₹1000',
      period: 'per month',
      description: 'One-on-one personalized instruction for faster progress',
      features: [
        'Live personal classes',
        'Customized curriculum',
        'Flexible scheduling',
        'Individual attention',
        'Progress tracking',
        'Priority support',
      ],
      popular: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your learning goals and budget
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative border-2 ${
              plan.popular ? 'border-primary shadow-lg' : 'border-border'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/ {plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full shadow-warm"
                size="lg"
                variant={plan.popular ? 'default' : 'outline'}
                onClick={scrollToContact}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
