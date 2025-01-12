import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const TeacherLogin = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Starting login process...");
      
      // First, attempt to sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      console.log("Sign in response:", { authData, error: signInError });

      if (signInError) {
        console.error("Sign in error:", signInError);
        throw signInError;
      }

      console.log("Successfully signed in, checking profile...");

      // After successful sign in, check if the user exists in profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      console.log("Profile check response:", { profileData, error: profileError });

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        // If there's an error fetching the profile, sign out and throw error
        await supabase.auth.signOut();
        throw new Error('Error fetching user profile');
      }

      console.log("Retrieved profile with role:", profileData?.role);

      // Check if user is either a teacher or admin
      if (profileData?.role !== 'teacher' && profileData?.role !== 'admin') {
        console.log("Unauthorized role:", profileData?.role);
        // If not a teacher or admin, sign out and throw error
        await supabase.auth.signOut();
        throw new Error('Unauthorized access');
      }

      console.log("Role check passed, proceeding with login...");

      toast.success("Login successful!");
      navigate("/teachers/dashboard");
    } catch (error) {
      console.error('Detailed login error:', error);
      
      let errorMessage = "Login failed. Please try again.";
      if (error instanceof Error) {
        if (error.message === 'Invalid login credentials') {
          errorMessage = "Invalid email or password.";
        } else if (error.message === 'Unauthorized access') {
          errorMessage = "This account is not authorized as a teacher or admin.";
        } else if (error.message === 'Error fetching user profile') {
          errorMessage = "Error accessing user profile. Please try again.";
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Teacher Login
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;