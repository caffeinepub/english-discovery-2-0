import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export default function ProgramsSection() {
  const programs = [
    {
      title: 'Beginner Level',
      level: 'A1-A2',
      description: 'Perfect for those starting their English speaking journey',
      features: [
        'Basic vocabulary and grammar',
        'Simple conversation practice',
        'Pronunciation fundamentals',
        'Everyday situations',
      ],
      color: 'bg-chart-2/10 border-chart-2/30',
    },
    {
      title: 'Intermediate Level',
      level: 'B1-B2',
      description: 'Build confidence and fluency in everyday conversations',
      features: [
        'Complex sentence structures',
        'Topic-based discussions',
        'Idioms and expressions',
        'Professional communication',
      ],
      color: 'bg-primary/10 border-primary/30',
    },
    {
      title: 'Advanced Level',
      level: 'C1-C2',
      description: 'Master advanced speaking skills and nuanced communication',
      features: [
        'Debate and argumentation',
        'Academic presentations',
        'Cultural nuances',
        'Native-like fluency',
      ],
      color: 'bg-chart-4/10 border-chart-4/30',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold mb-4">Our Programs</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the program that matches your current level and learning goals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.title} className={`border-2 ${program.color}`}>
            <CardHeader>
              <Badge className="w-fit mb-2" variant="secondary">
                {program.level}
              </Badge>
              <CardTitle className="text-2xl">{program.title}</CardTitle>
              <CardDescription className="text-base">{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/20 border-accent">
        <CardHeader>
          <CardTitle>What's Included in All Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Live Interactive Sessions</div>
                <div className="text-sm text-muted-foreground">
                  Real-time classes with expert instructors
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Small Group Practice</div>
                <div className="text-sm text-muted-foreground">
                  Maximum 8 students per class
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Personalized Feedback</div>
                <div className="text-sm text-muted-foreground">
                  Individual progress tracking and tips
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">Learning Materials</div>
                <div className="text-sm text-muted-foreground">
                  Access to resources and recordings
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
