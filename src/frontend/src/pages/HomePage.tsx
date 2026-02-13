import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  Users,
  Clock,
  Award,
  Globe,
  MessageCircle,
  BookOpen,
  Target,
} from 'lucide-react';
import ProgramsSection from '../components/ProgramsSection';
import PricingCards from '../components/PricingCards';
import FaqAccordion from '../components/FaqAccordion';
import ContactForm from '../components/ContactForm';
import FoundersSection from '../components/FoundersSection';
import { useListPhotos } from '../hooks/usePhotos';
import { useGetWebsiteContent } from '../hooks/useWebsiteContent';

export default function HomePage() {
  const { data: photos } = useListPhotos(false);
  const { data: content } = useGetWebsiteContent();
  const heroPhoto = photos?.find((p) => p.id === 'hero');

  const heroText = content?.heroText || 'Master English Speaking with Confidence';
  const aboutContent = content?.aboutContent || 
    'English Discovery 2.0 is your gateway to fluent English communication. Our expert instructors and interactive online classes help you build confidence and master the art of speaking English naturally.';
  const classesIntro = content?.classesContent || 
    'Choose the program that matches your current level and learning goals';
  const pricingIntro = content?.pricingContent || 
    'Choose the plan that best fits your learning goals and budget';

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Video,
      title: 'Live Interactive Classes',
      description: 'Real-time sessions with expert instructors',
    },
    {
      icon: Users,
      title: 'Small Group Learning',
      description: 'Maximum 8 students per class for personalized attention',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Choose class times that fit your lifestyle',
    },
    {
      icon: Award,
      title: 'Certified Instructors',
      description: 'Learn from experienced English language professionals',
    },
    {
      icon: Globe,
      title: '100% Online',
      description: 'Learn from anywhere in the world',
    },
    {
      icon: MessageCircle,
      title: 'Speaking Focus',
      description: 'Emphasis on practical conversation skills',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge className="w-fit" variant="secondary">
                Online English Speaking Classes
              </Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {heroText}
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of students worldwide in our interactive online classes. Learn to speak English fluently with confidence through proven methods and expert guidance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={scrollToContact} className="shadow-warm">
                  Start Learning Today
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  const element = document.getElementById('classes');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Explore Classes
                </Button>
              </div>
            </div>
            <div className="relative">
              {heroPhoto ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10">
                  <img
                    src={heroPhoto.blob.getDirectURL()}
                    alt="English Discovery 2.0"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10">
                  <img
                    src="/assets/WhatsApp Image 2026-02-13 at 12.44.09 PM-2.jpeg"
                    alt="English Discovery 2.0"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best online English learning platform with features designed for your success
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold">About English Discovery 2.0</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutContent}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a beginner taking your first steps or an advanced learner polishing your skills, we have the perfect program for you. Our proven methodology combines structured lessons with practical conversation practice to ensure rapid progress.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="section-padding">
        <div className="container-custom">
          <FoundersSection />
        </div>
      </section>

      {/* Programs Section */}
      <section id="classes" className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {classesIntro}
            </p>
          </div>
          <ProgramsSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {pricingIntro}
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-muted/30">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our classes
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
