import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContactForm from '../components/ContactForm';
import FaqAccordion from '../components/FaqAccordion';
import PricingCards from '../components/PricingCards';
import ProgramsSection from '../components/ProgramsSection';
import FoundersSection from '../components/FoundersSection';
import { MessageSquare, Users, Award, Globe, Video, Clock, Phone, Mail } from 'lucide-react';

export default function HomePage() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="section-padding bg-gradient-to-b from-accent/20 to-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge className="w-fit" variant="secondary">
                100% Online Classes
              </Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Master English Speaking with{' '}
                <span className="text-primary">Confidence</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Join English Discovery 2.0 and transform your English speaking skills through our
                interactive online-only classes. Learn from anywhere, anytime.
              </p>
              <div className="flex items-center gap-2 text-base font-medium text-primary">
                <Clock className="h-5 w-5" />
                <span>Batches available: Morning & Evening</span>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" onClick={scrollToContact} className="shadow-warm">
                  Get Started Today
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
              <img
                src="/assets/generated/hero-english-speaking.dim_1600x900.png"
                alt="Online English speaking classes"
                className="rounded-2xl shadow-2xl"
              />
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
              Experience the best online English learning platform designed for your success
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Video className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Live Interactive Classes</CardTitle>
                <CardDescription>
                  Engage in real-time conversations with expert instructors and fellow learners
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Small Group Sessions</CardTitle>
                <CardDescription>
                  Practice speaking in intimate groups for personalized attention and feedback
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Choose class times that fit your schedule with sessions throughout the day
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Conversation Focused</CardTitle>
                <CardDescription>
                  Build fluency through practical speaking exercises and real-world scenarios
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Certified Instructors</CardTitle>
                <CardDescription>
                  Learn from experienced, qualified teachers dedicated to your progress
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Global Community</CardTitle>
                <CardDescription>
                  Connect with learners worldwide and practice with diverse accents
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold">About English Discovery 2.0</h2>
              <p className="text-lg text-muted-foreground">
                We are a dedicated online-only platform committed to helping students master English
                speaking skills. Our innovative approach combines live instruction, interactive
                practice, and a supportive community to accelerate your learning journey.
              </p>
              <p className="text-lg text-muted-foreground">
                Since our launch, we've helped thousands of students gain confidence in their English
                speaking abilities. Our classes are designed to be engaging, practical, and tailored
                to your proficiency level.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Instructors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    To empower individuals worldwide to communicate confidently in English through
                    accessible, high-quality online education.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that language learning should be interactive, enjoyable, and
                    available to everyone, regardless of location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section-padding">
        <div className="container-custom">
          <FoundersSection />
        </div>
      </section>

      {/* Programs Section */}
      <section id="classes" className="section-padding bg-muted/30">
        <div className="container-custom">
          <ProgramsSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="container-custom">
          <PricingCards />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-muted/30">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our online English classes
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gradient-to-b from-background to-accent/20">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? Send us a message and we'll get back to you soon.
            </p>
          </div>
          
          {/* Contact Information */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Customer Care</div>
                  <a 
                    href="tel:7668397510" 
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    7668397510
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <a 
                    href="mailto:kuldeep.a.215620@gmail.com" 
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors break-all"
                  >
                    kuldeep.a.215620@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
