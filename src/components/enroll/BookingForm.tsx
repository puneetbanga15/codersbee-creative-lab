import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Laptop, Loader2, Check, Phone, Mail } from 'lucide-react';
import { CountrySelect } from './CountrySelect';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContactMethod } from '@/hooks/useContactMethod';

// Create a schema with conditional validation
const formSchema = z.object({
  contact_method: z.enum(["whatsapp", "email"]),
  country_code: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
  grade: z.string().min(1, "Please select your child's grade"),
  has_laptop: z.enum(["yes", "no"], {
    required_error: "Please indicate if you have a laptop",
  }),
}).superRefine((data, ctx) => {
  // Custom refinement for conditional validation
  if (data.contact_method === 'email') {
    if (!data.email || !data.email.includes('@')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a valid email address",
        path: ['email']
      });
    }
  }
  
  if (data.contact_method === 'whatsapp') {
    if (!data.phone_number || data.phone_number.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a valid phone number (min 10 digits)",
        path: ['phone_number']
      });
    }
  }
});

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [showValidationAlert, setShowValidationAlert] = React.useState(false);
  
  const { 
    contactMethod, 
    setContactMethod, 
    email, 
    setEmail,
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    resetFields,
    initializeForm,
    formInitialized
  } = useContactMethod();
  
  // Create form with resolver and mode set to onChange
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      contact_method: "whatsapp",
      country_code: "+91",
      phone_number: "",
      email: "",
      grade: "",
      has_laptop: "no",
    }
  });

  // Only show validation errors after user interaction
  React.useEffect(() => {
    if (!formInitialized) {
      setShowValidationAlert(false);
    }
  }, [formInitialized]);

  // Update form values when contactMethod changes
  React.useEffect(() => {
    form.setValue("contact_method", contactMethod, {
      shouldValidate: formInitialized
    });
    
    // Reset other field values when switching
    resetFields();
    
    // Trigger revalidation after changing contact method
    if (formInitialized) {
      form.trigger();
    }
  }, [contactMethod, form, resetFields, formInitialized]);

  // Synchronize form values with contact hook state
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Mark form as initialized on first interaction
      if (name) {
        initializeForm();
      }
      
      if (value.email !== undefined) {
        setEmail(value.email as string);
      }
      if (value.phone_number !== undefined) {
        setPhoneNumber(value.phone_number as string);
      }
      if (value.country_code !== undefined) {
        setCountryCode(value.country_code as string);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, setEmail, setPhoneNumber, setCountryCode, initializeForm]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submission started with values:", JSON.stringify({
      contact_method: values.contact_method,
      country_code: values.country_code,
      phone_number: values.phone_number,
      email: values.email,
      grade: values.grade,
      has_laptop: values.has_laptop
    }));
    
    try {
      // Set submitting state and clear any previous errors
      setIsSubmitting(true);
      setBookingError(null);
      
      // Show immediate feedback
      toast({
        title: "Booking Started",
        description: "Processing your trial class booking...",
      });
      
      console.log("Preparing booking data for Supabase...");
      
      // Prepare data for database storage
      const bookingData = {
        grade: parseInt(values.grade),
        has_laptop: values.has_laptop === "yes",
        ...(values.contact_method === 'whatsapp' ? {
          phone_number: values.phone_number,
          country_code: values.country_code
        } : {
          email: values.email
        })
      };
      
      console.log("Sending booking data to Supabase:", JSON.stringify(bookingData));
      
      // Store booking in Supabase with detailed error logging
      console.log("Attempting to store booking in Supabase trial_bookings table with data:", JSON.stringify(bookingData, null, 2));
      
      try {
        const { data, error: dbError } = await supabase
          .from('trial_bookings')
          .insert(bookingData)
          .select(); // Add select to get the inserted row
  
        if (dbError) {
          console.error('Error storing booking in Supabase:', dbError);
          console.error('Error details:', {
            code: dbError.code,
            message: dbError.message,
            details: dbError.details,
            hint: dbError.hint
          });
          throw new Error(`Failed to store booking information: ${dbError.message}`);
        }
        
        console.log("Booking stored in Supabase successfully, received data:", data);
      } catch (insertError) {
        console.error('Exception caught during Supabase insert:', insertError);
        throw insertError; // Re-throw to be caught by the outer try/catch
      }
      
      // Send notification based on contact method with enhanced error handling
      if (values.contact_method === 'whatsapp' && values.phone_number) {
        try {
          const whatsappPayload = {
            phone: values.phone_number,
            grade: values.grade,
            hasLaptop: values.has_laptop === "yes",
            countryCode: values.country_code
          };
          
          console.log("Attempting to send WhatsApp notification with payload:", JSON.stringify(whatsappPayload, null, 2));
          
          const { data, error } = await supabase.functions.invoke('send-whatsapp-notification', {
            body: whatsappPayload
          });
          
          if (error) {
            console.error('WhatsApp notification error:', error);
            console.error('WhatsApp error details:', {
              message: error.message,
              context: error.context,
              statusText: error.statusText,
              status: error.status
            });
          } else {
            console.log("WhatsApp notification sent successfully, response:", JSON.stringify(data, null, 2));
          }
        } catch (whatsappError) {
          console.error('Exception while sending WhatsApp notification:', whatsappError);
          console.error('WhatsApp error type:', typeof whatsappError);
          console.error('WhatsApp error message:', whatsappError instanceof Error ? whatsappError.message : String(whatsappError));
          // Continue with the flow even if notification fails
        }
      } else if (values.contact_method === 'email' && values.email) {
        try {
          const emailPayload = {
            email: values.email,
            grade: values.grade,
            hasLaptop: values.has_laptop === "yes",
          };
          
          console.log("Attempting to send email notification with payload:", JSON.stringify(emailPayload, null, 2));
          
          const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
            body: emailPayload
          });
          
          if (error) {
            console.error('Email notification error:', error);
            console.error('Email error details:', {
              message: error.message,
              context: error.context,
              statusText: error.statusText,
              status: error.status
            });
            
            // Continue with booking flow but warn the user
            toast({
              variant: "warning",
              title: "Booking saved, but email notification failed",
              description: "We've saved your booking, but couldn't send an email confirmation. Please check your inbox later or contact support if needed.",
            });
            
          } else {
            console.log("Email notification sent successfully, response:", JSON.stringify(data, null, 2));
            console.log("Email notification detailed response:", {
              success: data?.success,
              notification: data?.notification,
              email: data?.email
            });
          }
        } catch (emailError) {
          console.error('Exception while sending email notification:', emailError);
          console.error('Email error type:', typeof emailError);
          console.error('Email error message:', emailError instanceof Error ? emailError.message : String(emailError));
          
          // Continue with booking flow but warn the user
          toast({
            variant: "warning",
            title: "Booking saved, but email notification failed",
            description: "We've saved your booking, but couldn't send an email confirmation. Please check your inbox later or contact support if needed.",
          });
        }
      }
      
      // Set success state and show confirmation toast
      setIsSuccess(true);
      toast({
        title: "Booking Confirmed!",
        description: values.contact_method === 'whatsapp' 
          ? "We'll contact you on your WhatsApp number shortly."
          : "We'll contact you via email shortly.",
      });
      
      // Open Calendly in a new tab for scheduling
      console.log("Opening Calendly scheduling page");
      setTimeout(() => {
        window.open('https://calendly.com/codersbee/class-slot', '_blank');
      }, 500);
      
    } catch (error) {
      console.error('Error in form submission:', error);
      setBookingError("We had an issue processing your booking. Please try again or contact us directly.");
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
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
            Thank you for booking a trial class with CodersBee. We'll contact you shortly to confirm your booking.
          </p>
          <p className="text-gray-500 text-sm">
            Please check your Calendly scheduling page to select your preferred time slot.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90 cursor-pointer mt-4"
          >
            Schedule Your Class Now
          </Button>
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

      {/* Only show validation alert after user has interacted with form AND there are errors */}
      {formInitialized && showValidationAlert && Object.keys(form.formState.errors).length > 0 && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <AlertTitle className="text-amber-800">Form has validation errors</AlertTitle>
          <AlertDescription className="text-amber-700">
            Please check the highlighted fields below.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Form validation failed:", errors);
          setShowValidationAlert(true);
          toast({
            variant: "destructive",
            title: "Please check your form",
            description: "Some required fields need your attention.",
          });
        })} className="space-y-6">
          <FormField
            control={form.control}
            name="contact_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How should we contact you?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setContactMethod(value as 'whatsapp' | 'email');
                      // Reset validation errors when switching
                      if (value === 'email') {
                        form.clearErrors('phone_number');
                      } else {
                        form.clearErrors('email');
                      }
                      
                      // Mark form as interacted with
                      initializeForm();
                    }}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <label htmlFor="whatsapp" className="flex items-center gap-1">
                        <Phone className="w-4 h-4" /> WhatsApp
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> Email
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {contactMethod === "whatsapp" ? (
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
                              onValueChange={(value) => {
                                field.onChange(value);
                                initializeForm();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormControl>
                      <Input 
                        placeholder="Enter your WhatsApp number" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          initializeForm();
                        }}
                        className="flex-1"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        initializeForm();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's Grade</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="12" 
                    placeholder="Enter grade (1-12)" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      initializeForm();
                    }}
                  />
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      initializeForm();
                    }}
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
            className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90 cursor-pointer"
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
