
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

const formSchema = z.object({
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
      phone_number: "",
      grade: "",
      has_laptop: "no",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
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
