import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { SiYoutube } from 'react-icons/si';
import { useGetWebsiteContent } from '../hooks/useWebsiteContent';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: content } = useGetWebsiteContent();

  const youtubeLink = content?.introVideoLink || 'https://youtube.com/@englishdiscovery2.o?si=Dxh-_WZvGCHPj7hf';

  const scrollToSection = (sectionId: string) => {
    // Navigate to home first if not already there
    if (window.location.pathname !== '/') {
      navigate({ to: '/' });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Classes', id: 'classes' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center space-x-3 transition-opacity hover:opacity-80"
        >
          <img
            src="/assets/generated/ed2o-logo.dim_512x512.png"
            alt="English Discovery 2.0"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-xl font-bold text-foreground">
            English Discovery 2.0
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium"
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-sm font-medium"
          >
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
            >
              <SiYoutube className="h-5 w-5" />
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="justify-start text-base"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                asChild
                className="justify-start text-base"
              >
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiYoutube className="h-5 w-5" />
                  YouTube
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
