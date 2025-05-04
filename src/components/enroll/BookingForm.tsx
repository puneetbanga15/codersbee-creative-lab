
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

// Create a more flexible schema with proper conditional validation
const formSchema = z.object({
  contact_method: z.enum(["whatsapp", "email"]),
  country_code: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email().optional(),
  grade: z.string().min(1, "Please select your child's grade"),
  has_laptop: z.enum(["yes", "no"], {
    required_error: "Please indicate if you have a laptop",
  }),
}).superRefine((data, ctx) => {
  // Only validate email when email contact method is selected
  if (data.contact_method === 'email') {
    if (!data.email || !data.email.includes('@')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a valid email address",
        path: ['email']
      });
    }
  }
  
  // Only validate phone number when whatsapp contact method is selected
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
  
  // Create form with resolver
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
      shouldValidate: formInitialized // Only trigger validation if form is initialized
    });
    
    // Reset other field values when switching
    resetFields();
    
    // This triggers revalidation after changing the contact method
    if (formInitialized) {
      form.trigger("contact_method");
    }
    
    console.log(`Switched to contact method: ${contactMethod}`);
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
    console.log("Form submission started with values:", values);
    
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
      
      console.log("Sending booking data to Supabase:", bookingData);
      
      // Store booking in Supabase
      const { error: dbError } = await supabase
        .from('trial_bookings')
        .insert(bookingData);

      if (dbError) {
        console.error('Error storing booking in Supabase:', dbError);
        throw new Error('Failed to store booking information');
      }
      
      console.log("Booking stored in Supabase successfully");
      
      // Send notification based on contact method
      if (values.contact_method === 'whatsapp' && values.phone_number) {
        try {
          console.log("Attempting to send WhatsApp notification");
          const { data, error } = await supabase.functions.invoke('send-whatsapp-notification', {
            body: {
              phone: values.phone_number,
              grade: values.grade,
              hasLaptop: values.has_laptop === "yes",
              countryCode: values.country_code
            }
          });
          
          if (error) {
            console.error('WhatsApp notification error:', error);
          } else {
            console.log("WhatsApp notification sent successfully", data);
          }
        } catch (whatsappError) {
          console.error('Exception while sending WhatsApp notification:', whatsappError);
          // Continue with the flow even if notification fails
        }
      } else if (values.contact_method === 'email' && values.email) {
        try {
          console.log("Attempting to send email notification");
          const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
            body: {
              email: values.email,
              grade: values.grade,
              hasLaptop: values.has_laptop === "yes",
            }
          });
          
          if (error) {
            console.error('Email notification error:', error);
          } else {
            console.log("Email notification sent successfully", data);
          }
        } catch (emailError) {
          console.error('Exception while sending email notification:', emailError);
          // Continue with the flow even if notification fails
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
      window.open('https://calendly.com/codersbee/class-slot', '_blank');
      
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

      {/* Show validation alert only after user has interacted with the form */}
      {showValidationAlert && Object.keys(form.formState.errors).length > 0 && (
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
                          console.log("Phone number changed:", e.target.value);
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
                        console.log("Email changed:", e.target.value);
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
            disabled={isSubmitting}  // Only disable during submission
            onClick={() => {
              console.log("Book Now button clicked");
              
              // Set validation alert to show if we have errors
              if (Object.keys(form.formState.errors).length > 0) {
                setShowValidationAlert(true);
              }
              
              // Debug logs
              console.log("Current form state:", {
                isValid: form.formState.isValid,
                isDirty: form.formState.isDirty,
                errors: form.formState.errors,
                contactMethod: contactMethod,
                email: form.getValues("email"),
                phone: form.getValues("phone_number"),
                grade: form.getValues("grade"),
                hasLaptop: form.getValues("has_laptop"),
              });
            }}
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

      {/* Debug Panel */}
      <div className="mt-4 p-2 border border-gray-200 rounded-md text-xs text-gray-500 bg-gray-50">
        <p>Form Status: {form.formState.isValid ? 'Valid' : 'Invalid'}</p>
        <p>Selected Method: {contactMethod}</p>
        <p>Error Count: {Object.keys(form.formState.errors).length}</p>
        <p>Form Initialized: {formInitialized ? 'Yes' : 'No'}</p>
      </div>
    </motion.div>
  );
};
