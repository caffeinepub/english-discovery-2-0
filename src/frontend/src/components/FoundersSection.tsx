import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetPhoto } from '../hooks/usePhotos';

export default function FoundersSection() {
  const { data: kuldeepPhoto } = useGetPhoto('founder_kuldeep', true);
  const { data: saloniPhoto } = useGetPhoto('founder_saloni', true);
  const { data: sumitPhoto } = useGetPhoto('founder_sumit', true);

  const founders = [
    {
      name: 'Saloni Singh',
      role: 'Co-founder',
      initials: 'SS',
      photo: sumitPhoto,
      fallbackImage: '/assets/WhatsApp Image 2026-02-13 at 12.44.10 PM (1)-1.jpeg',
    },
    {
      name: 'Sumit Shrivastav',
      role: 'Co-founder',
      initials: 'SS',
      photo: saloniPhoto,
      fallbackImage: '/assets/WhatsApp Image 2026-02-13 at 12.44.58 PM-1.jpeg',
    },
    {
      name: 'Kuldeep',
      role: 'Founder',
      initials: 'K',
      photo: kuldeepPhoto,
      fallbackImage: '/assets/WhatsApp Image 2026-02-13 at 12.44.10 PM-2.jpeg',
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
              <div className="mx-auto mb-4">
                <Avatar className="w-40 h-40 text-3xl">
                  <AvatarImage
                    src={founder.photo ? founder.photo.blob.getDirectURL() : founder.fallbackImage}
                    alt={founder.name}
                    onError={(e) => {
                      // If backend photo fails, try fallback
                      if (e.currentTarget.src !== founder.fallbackImage) {
                        e.currentTarget.src = founder.fallbackImage;
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {founder.initials}
                  </AvatarFallback>
                </Avatar>
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
