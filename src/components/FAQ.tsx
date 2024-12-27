import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin } from "lucide-react";

export const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-codersbee-vivid">Questions</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do we start?</AccordionTrigger>
              <AccordionContent>
                Start with a FREE trial class where our experienced teacher will assess your child's 
                current level and suggest the best learning path. We'll then work together to find 
                mutually agreeable class times that fit your schedule.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Who will teach my child?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Classes are primarily conducted by Manisha Ma'am, an experienced educator and 
                  tech professional. Additionally, we invite industry leaders in AI for advanced 
                  classes and special webinars.
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open('https://www.linkedin.com/in/manisha-kapoor-codersbee/', '_blank')}
                >
                  <Linkedin className="w-4 h-4" />
                  View Teacher's Profile
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How long do the classes last?</AccordionTrigger>
              <AccordionContent>
                The duration varies based on learning goals. The complete journey from Scratch to 
                Python to AI typically takes 2-3 years, but many students with prior coding knowledge 
                progress faster. Our goal is to create AI champions by high school, enabling them to 
                participate in hackathons and continue their journey independently.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What about the costs?</AccordionTrigger>
              <AccordionContent>
                We pride ourselves on offering among the lowest rates in the industry, even for 
                advanced AI courses. Our pricing is transparent, and we offer flexible scheduling 
                to accommodate exam breaks and vacations. No long-term commitments required!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What kind of projects will my child create?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Students create exciting projects ranging from games and animations to AI-powered 
                  applications. Check out our Facebook page to see the amazing work of our students!
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open('https://www.facebook.com/CodersBee', '_blank')}
                >
                  <Facebook className="w-4 h-4" />
                  View Student Projects
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};