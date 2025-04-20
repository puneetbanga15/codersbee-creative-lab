
import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Laptop, Loader2 } from 'lucide-react';
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
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [emailStatus, setEmailStatus] = React.useState<'pending' | 'success' | 'error' | null>(null);
  const [dbStatus, setDbStatus] = React.useState<'pending' | 'success' | 'error' | null>(null);
  const [emailErrorDetails, setEmailErrorDetails] = React.useState<string | null>(null);

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
      setEmailErrorDetails(null);
      setEmailStatus('pending');
      setDbStatus('pending');
      console.log("Form submitted with values:", values);
      
      // Prepare data for email sending and database storage
      const bookingData = {
        phone: values.phone_number,
        grade: values.grade,
        hasLaptop: values.has_laptop === "yes",
        countryCode: values.country_code
      };
      
      console.log("Prepared booking data:", bookingData);
      
      // Open Calendly in a new tab
      window.open('https://calendly.com/codersbee/class-slot', '_blank');
      
      // Show toast for immediate feedback
      toast({
        title: "Booking Started!",
        description: "Processing your trial class booking...",
      });
      
      // Store booking in Supabase
      try {
        console.log("Storing booking in database...");
        try {
          const { data: dbData, error: dbError } = await supabase
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
            setDbStatus('error');
            
            // Try without country_code if it fails (for backward compatibility with old table schema)
            if (dbError.message?.includes('country_code')) {
              console.log("Trying database insert without country_code field...");
              const { error: fallbackError } = await supabase
                .from('trial_bookings')
                .insert({
                  phone_number: values.phone_number,
                  grade: parseInt(values.grade),
                  has_laptop: values.has_laptop === "yes"
                });
                
              if (fallbackError) {
                console.error('Fallback database insert also failed:', fallbackError);
              } else {
                console.log("Successfully stored booking in database (fallback method)");
                setDbStatus('success');
              }
            }
          } else {
            console.log("Successfully stored booking in database:", dbData);
            setDbStatus('success');
          }
        } catch (dbCatchError) {
          console.error('Exception while storing booking:', dbCatchError);
          setDbStatus('error');
        }
      } catch (dbError) {
        console.error('Exception in database operation:', dbError);
        setDbStatus('error');
      }
      
      // Send the enrollment email
      console.log("Calling edge function send-enrollment-email");
      try {
        const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
          body: bookingData
        });
        
        console.log("Edge function response:", { data, error });
        
        if (error) {
          console.error('Error sending enrollment email:', error);
          console.error('Error details:', JSON.stringify(error, null, 2));
          setEmailStatus('error');
          setEmailErrorDetails(JSON.stringify(error));
          setBookingError("Email notification failed. We'll still contact you via the phone number provided.");
          toast({
            variant: "destructive",
            title: "Note: Email notification failed",
            description: "We received your booking, but there was an issue with our email system. We'll still contact you.",
          });
        } else if (data?.error) {
          console.error('Email service returned an error:', data.error);
          console.error('Error details:', data.details || 'No details provided');
          setEmailStatus('error');
          setEmailErrorDetails(data.details || data.error);
          setBookingError(`Email notification issue: ${data.error}`);
          toast({
            variant: "destructive",
            title: "Email Sending Issue",
            description: data.error,
          });
        } else {
          console.log("Email sent successfully:", data);
          setEmailStatus('success');
          toast({
            title: "Booking Confirmed!",
            description: "Your booking notification has been sent to our team.",
          });
        }
      } catch (emailCatchError) {
        console.error('Exception while sending email:', emailCatchError);
        console.error('Exception details:', JSON.stringify(emailCatchError, null, 2));
        setEmailStatus('error');
        setEmailErrorDetails(String(emailCatchError));
        setBookingError("Email notification failed. We'll still contact you via the phone number provided.");
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setBookingError("Something went wrong with your booking. Please try again or contact us directly.");
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
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

      {/* Status indicator for debugging */}
      {(dbStatus || emailStatus) && (
        <div className="mt-4 p-2 border border-gray-200 rounded text-xs text-gray-500">
          <div>DB: {dbStatus || 'not started'}</div>
          <div>Email: {emailStatus || 'not started'}</div>
          {emailErrorDetails && (
            <div className="mt-1 p-1 bg-gray-100 rounded overflow-auto max-h-20">
              <pre className="text-xs break-words">{emailErrorDetails}</pre>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
