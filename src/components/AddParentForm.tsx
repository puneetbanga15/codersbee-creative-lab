import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timezones = [
  { value: "America/New_York", label: "US Eastern (ET)" },
  { value: "America/Chicago", label: "US Central (CT)" },
  { value: "America/Denver", label: "US Mountain (MT)" },
  { value: "America/Los_Angeles", label: "US Pacific (PT)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Australia/Sydney", label: "Australia (AEST)" },
  { value: "Asia/Seoul", label: "South Korea (KST)" },
];

const formSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  timezone: z.string().min(1, "Please select a timezone"),
  children: z.array(z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
  })).min(1).max(3),
});

type FormValues = z.infer<typeof formSchema>;

export const AddParentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      timezone: "",
      children: [{ name: "" }],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Create parent account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: "tempPass123!", // You might want to generate this randomly
        options: {
          data: {
            full_name: values.parentName,
            phone_number: values.phone,
            timezone: values.timezone,
          },
        },
      });

      if (authError) throw authError;

      // Create student records
      for (const child of values.children) {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            full_name: child.name,
            parent_id: authData.user?.id,
            timezone: values.timezone,
          });

        if (studentError) throw studentError;
      }

      toast.success("Parent and children added successfully!");
      onSuccess();
    } catch (error) {
      console.error('Error adding parent:', error);
      toast.error("Failed to add parent and children");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter parent's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('children').map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`children.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child {index + 1} Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter child's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {form.watch('children').length < 3 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const children = form.getValues('children');
              form.setValue('children', [...children, { name: '' }]);
            }}
          >
            Add Another Child
          </Button>
        )}

        <Button type="submit" className="w-full">Add Parent</Button>
      </form>
    </Form>
  );
};