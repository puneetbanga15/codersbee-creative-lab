import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").endsWith("@teacher.codersbee.com", "Email must end with @teacher.codersbee.com"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const AddTeacherForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // First, check if the user already exists
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers({
        filters: {
          email: values.email
        }
      });

      if (getUserError) {
        console.error('Error checking existing user:', getUserError);
        toast.error("Failed to check if user exists. Please try again.");
        return;
      }

      if (users && users.length > 0) {
        toast.error("A teacher with this email already exists");
        return;
      }

      // If user doesn't exist, create new account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            phone_number: values.phone,
            role: 'teacher'
          },
        },
      });

      if (signUpError) {
        console.error('Error creating teacher:', signUpError);
        toast.error(signUpError.message);
        return;
      }

      if (!data.user) {
        toast.error("Failed to create teacher account");
        return;
      }

      toast.success("Teacher added successfully!");
      onSuccess();
      form.reset();
    } catch (error: any) {
      console.error('Error adding teacher:', error);
      toast.error(error.message || "Failed to add teacher. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter teacher's name" {...field} />
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
                <Input type="email" placeholder="name@teacher.codersbee.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
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

        <Button type="submit" className="w-full">Add Teacher</Button>
      </form>
    </Form>
  );
};