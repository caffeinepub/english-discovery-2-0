import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqAccordion() {
  const faqs = [
    {
      question: 'Are all classes conducted online?',
      answer:
        'Yes! English Discovery 2.0 is a 100% online-only platform. All our classes are conducted via video conferencing, allowing you to learn from anywhere in the world with an internet connection.',
    },
    {
      question: 'What equipment do I need for online classes?',
      answer:
        'You need a computer, tablet, or smartphone with a stable internet connection, a webcam, and a microphone (or headset). We recommend using headphones for better audio quality during classes.',
    },
    {
      question: 'How are students placed in different levels?',
      answer:
        'After enrollment, you\'ll take a brief speaking assessment with one of our instructors. This helps us understand your current level and place you in the appropriate class (Beginner, Intermediate, or Advanced).',
    },
    {
      question: 'What is the class size?',
      answer:
        'We keep our classes small with a maximum of 8 students per session. This ensures everyone gets plenty of speaking time and personalized attention from the instructor.',
    },
    {
      question: 'Can I choose my class schedule?',
      answer:
        'Yes! We offer classes throughout the day across different time zones. When you enroll, you can select the times that work best for your schedule. You can also change your schedule if needed.',
    },
    {
      question: 'What if I miss a class?',
      answer:
        'All classes are recorded and available for 30 days. If you miss a session, you can watch the recording at your convenience. Professional and Premium members can also reschedule classes in advance.',
    },
    {
      question: 'Do you offer trial classes?',
      answer:
        'Yes! We offer a free trial class so you can experience our teaching method and meet our instructors before committing to a plan. Contact us to schedule your trial.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely. There are no long-term contracts. You can cancel your subscription at any time, and you\'ll continue to have access until the end of your billing period.',
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
