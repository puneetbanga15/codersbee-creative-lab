import { Facebook, Youtube, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919996465023', '_blank');
  };

  const handleTrialClick = () => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/codersbee",
      label: "Facebook"
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@codersbee",
      label: "YouTube"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/codersbee/",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/manisha-kapoor-codersbee/",
      label: "LinkedIn"
    }
  ];

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-[1400px] mx-auto">
        {/* CTA Section */}
        <div className="border-b">
          <div className="px-6 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-codersbee-dark">
              Start Your Child's AI Journey Today
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of parents who have empowered their children with future-ready skills through CodersBee's innovative learning programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                onClick={handleWhatsAppClick}
              >
                Connect on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white flex items-center justify-center gap-2"
                onClick={handleTrialClick}
              >
                Book Your FREE Trial Class
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/b50fbc0a-2707-4d3e-867a-240d788493a0.png" 
              alt="CodersBee Logo" 
              className="h-12" 
            />
            <p className="text-gray-600">
              Empowering young minds with coding and AI skills for the future.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-[#9b87f5]">About Us</Link></li>
              <li><Link to="/tutorials" className="text-gray-600 hover:text-[#9b87f5]">Tutorials</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-[#9b87f5]">Projects</Link></li>
              <li><Link to="/quizzes" className="text-gray-600 hover:text-[#9b87f5]">Quizzes</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4">Reach Us On</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: admin@codersbee.com</li>
              <li className="text-gray-600">Phone: +91-7087884023</li>
              <li className="text-gray-600">WhatsApp: +91-9996465023</li>
            </ul>
          </div>
          
          {/* Connect With Us */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-600 mb-4">
              Follow us on social media for updates, success stories, and educational content.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#9b87f5] transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t px-6 py-6">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} CodersBee. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};