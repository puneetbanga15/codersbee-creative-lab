import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Laptop, Loader2, Check } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  
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
      setIsSubmitting(true);
      setBookingError(null);
      
      // Prepare data for WhatsApp notification and database storage
      const bookingData = {
        phone: values.phone_number,
        grade: values.grade,
        hasLaptop: values.has_laptop === "yes",
        countryCode: values.country_code
      };
      
      // Open Calendly in a new tab
      window.open('https://calendly.com/codersbee/class-slot', '_blank');
      
      // Show toast for immediate feedback
      toast({
        title: "Booking Started",
        description: "Processing your trial class booking...",
      });
      
      // Store booking in Supabase
      try {
        console.log("Storing booking in database...");
        try {
          // First try with country_code (for newer schema)
          const { error: dbError } = await supabase
            .from('trial_bookings')
            .insert({
              phone_number: values.phone_number,
              grade: parseInt(values.grade),
              has_laptop: values.has_laptop === "yes",
              country_code: values.country_code
            });

          if (dbError) {
            console.log('Error storing booking with country_code, trying without:', dbError);
            
            // Try without country_code (for backward compatibility)
            const { error: fallbackError } = await supabase
              .from('trial_bookings')
              .insert({
                phone_number: values.phone_number,
                grade: parseInt(values.grade),
                has_laptop: values.has_laptop === "yes"
              });
              
            if (fallbackError) {
              console.error('Fallback database insert also failed:', fallbackError);
              // Don't block the flow, continue with email sending
            } else {
              console.log("Successfully stored booking in database (fallback method)");
            }
          } else {
            console.log("Successfully stored booking in database with country_code");
          }
        } catch (dbCatchError) {
          console.error('Exception while storing booking:', dbCatchError);
          // Continue with the flow - don't block on DB issues
        }
      } catch (dbError) {
        console.error('Exception in database operation:', dbError);
        // Continue with the flow - don't block on DB issues
      }
      
      // Send WhatsApp notification
      console.log("Calling edge function send-whatsapp-notification");
      try {
        const { data, error } = await supabase.functions.invoke('send-whatsapp-notification', {
          body: bookingData
        });
        
        console.log("WhatsApp notification function response:", { data, error });
        
        if (error) {
          console.error('Error calling WhatsApp notification function:', error);
        }
        
        // Consider booking successful regardless of notification status
        setIsSuccess(true);
        toast({
          title: "Booking Confirmed!",
          description: "We'll contact you on your WhatsApp number shortly.",
        });
      } catch (whatsappError) {
        console.error('Exception while calling WhatsApp notification function:', whatsappError);
        // Still consider the booking successful
        setIsSuccess(true);
        toast({
          title: "Booking Confirmed!",
          description: "We'll contact you on your WhatsApp number shortly.",
        });
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setBookingError("We had an issue processing your booking. Please try again or contact us directly.");
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full mx-auto"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-codersbee-dark">Booking Confirmed!</h3>
          <p className="text-gray-600">
            Thank you for booking a trial class with CodersBee. We'll contact you on your WhatsApp number shortly to confirm your booking.
          </p>
          <p className="text-gray-500 text-sm">
            Please check your Calendly scheduling page to select your preferred time slot.
          </p>
        </div>
      </motion.div>
    );
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

      {bookingError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>An issue occurred</AlertTitle>
          <AlertDescription>{bookingError}</AlertDescription>
        </Alert>
      )}

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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Processing...
              </>
            ) : (
              'Book Now'
            )}
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
