
import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Laptop } from 'lucide-react';
import { CountrySelect } from './CountrySelect';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  country_code: z.string().min(2, "Please select country code"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  grade: z.string().min(1, "Please select your child's grade"),
  has_laptop: z.enum(["yes", "no"], {
    required_error: "Please indicate if you have a laptop",
  }),
})

export const BookingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country_code: "+91", // Default to India
      phone_number: "",
      grade: "",
      has_laptop: "no",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      
      // Prepare data for email sending
      const emailData = {
        phone: values.phone_number,
        grade: values.grade,
        hasLaptop: values.has_laptop === "yes",
        countryCode: values.country_code
      };
      
      console.log("Sending email with data:", emailData);
      
      // Open Calendly in a new tab
      window.open('https://calendly.com/codersbee/class-slot', '_blank');
      
      // Show toast for immediate feedback
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your trial class.",
      });
      
      // Try to store booking in Supabase
      try {
        const { error: dbError } = await supabase
          .from('trial_bookings')
          .insert({
            phone_number: values.phone_number,
            grade: parseInt(values.grade),
            has_laptop: values.has_laptop === "yes",
            country_code: values.country_code
          });

        if (dbError) {
          console.error('Error storing booking in database:', dbError);
          console.error('Error details:', JSON.stringify(dbError, null, 2));
        } else {
          console.log("Successfully stored booking in database");
        }
      } catch (dbCatchError) {
        console.error('Exception while storing booking:', dbCatchError);
      }
      
      // Send the enrollment email
      console.log("Calling edge function send-enrollment-email");
      try {
        const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
          body: emailData
        });
        
        console.log("Edge function response:", { data, error });
        
        if (error) {
          console.error('Error sending enrollment email:', error);
          console.error('Error details:', JSON.stringify(error, null, 2));
          toast({
            variant: "destructive",
            title: "Note: Email notification failed",
            description: "We received your booking, but there was an issue with our email system. We'll still contact you.",
          });
        } else {
          console.log("Email sent successfully:", data);
          toast({
            title: "Booking Confirmed!",
            description: "Your booking notification has been sent to our team.",
          });
        }
      } catch (emailCatchError) {
        console.error('Exception while sending email:', emailCatchError);
        console.error('Exception details:', JSON.stringify(emailCatchError, null, 2));
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full mx-auto"
    >
      <h3 className="text-2xl font-bold text-codersbee-dark mb-6">
        Book Your Free Trial Class
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="country_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CountrySelect 
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormControl>
                    <Input placeholder="Enter your WhatsApp number" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's Grade</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="12" placeholder="Enter grade (1-12)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_laptop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a laptop?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <label htmlFor="no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90"
          >
            Book Now
          </Button>
        </form>
      </Form>

      <div className="mt-6 bg-codersbee-purple/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Laptop className="w-4 h-4 text-codersbee-vivid" />
          <span>Having a laptop is recommended but not mandatory</span>
        </div>
      </div>
    </motion.div>
  );
};
