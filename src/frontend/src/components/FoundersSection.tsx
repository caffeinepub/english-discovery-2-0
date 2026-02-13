import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FoundersSection() {
  const founders = [
    {
      name: 'Kuldeep',
      role: 'Founder',
      image: '/assets/generated/founder-kuldeep.dim_512x512.jpg',
    },
    {
      name: 'Saloni Singh',
      role: 'Co-founder',
      image: '/assets/generated/cofounder-saloni-singh.dim_512x512.jpg',
    },
    {
      name: 'Sumit Srivastava',
      role: 'Co-founder',
      image: '/assets/generated/cofounder-sumit-srivastava.dim_512x512.jpg',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold mb-4">Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the passionate educators behind English Discovery 2.0
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {founders.map((founder) => (
          <Card key={founder.name} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 overflow-hidden rounded-full w-40 h-40">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardTitle className="text-xl">{founder.name}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                {founder.role}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
