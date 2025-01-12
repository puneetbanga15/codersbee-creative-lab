import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ParentFormFields } from "./ParentFormFields";
import { ChildInputField } from "./ChildInputField";
import { ScrollArea } from "./ui/scroll-area";
import { AuthError } from "@supabase/supabase-js";

const formSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  timezone: z.string().min(1, "Please select a timezone"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  children: z.array(z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    courseName: z.string().min(2, "Course name must be at least 2 characters"),
    teacherId: z.string().min(1, "Please select a teacher"),
  })).min(1).max(3),
});

type FormValues = z.infer<typeof formSchema>;

interface AddParentFormProps {
  onSuccess: () => void;
  initialData?: {
    full_name: string;
    phone_number: string;
    students?: Array<{
      full_name: string;
      course_enrollments?: Array<{
        course_name: string;
        teacher?: { id: string };
      }>;
    }>;
  };
}

const getErrorMessage = (error: AuthError) => {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Failed to create account. Please try again.';
    case 'User already registered':
      return 'An account with this email already exists.';
    default:
      return error.message;
  }
};

export const AddParentForm = ({ onSuccess, initialData }: AddParentFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: initialData?.full_name || "",
      email: "",
      phone: initialData?.phone_number || "",
      timezone: "",
      password: "",
      children: initialData?.students?.map(student => ({
        name: student.full_name,
        courseName: student.course_enrollments?.[0]?.course_name || "",
        teacherId: student.course_enrollments?.[0]?.teacher?.id || "",
      })) || [{ name: "", courseName: "", teacherId: "" }],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // First create the auth user with password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.parentName,
            phone_number: values.phone,
            timezone: values.timezone,
          },
        },
      });

      if (authError) {
        toast.error(getErrorMessage(authError));
        return;
      }

      if (!authData.user) {
        toast.error('No user data returned');
        return;
      }

      // Wait for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create students and enroll them in courses
      for (const child of values.children) {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            full_name: child.name,
            parent_id: authData.user.id,
            timezone: values.timezone,
          });

        if (studentError) {
          console.error('Student creation error:', studentError);
          toast.error(`Failed to create student ${child.name}: ${studentError.message}`);
          return;
        }

        // Get the created student to use their ID
        const { data: studentData, error: fetchError } = await supabase
          .from('students')
          .select('id')
          .eq('parent_id', authData.user.id)
          .eq('full_name', child.name)
          .single();

        if (fetchError || !studentData) {
          console.error('Error fetching student:', fetchError);
          toast.error(`Failed to fetch student data for ${child.name}`);
          return;
        }

        const { error: enrollmentError } = await supabase
          .from('course_enrollments')
          .insert({
            student_id: studentData.id,
            course_name: child.courseName,
            teacher_id: child.teacherId,
          });

        if (enrollmentError) {
          console.error('Enrollment error:', enrollmentError);
          toast.error(`Failed to enroll student ${child.name}: ${enrollmentError.message}`);
          return;
        }
      }

      toast.success("Parent and children added successfully!");
      onSuccess();
    } catch (error) {
      console.error('Error adding parent:', error);
      toast.error("Failed to add parent and children. Please try again.");
    }
  };

  return (
    <ScrollArea className="h-[80vh] px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ParentFormFields form={form} />
          
          <div className="flex flex-col gap-4">
            {form.watch('children').map((_, index) => (
              <ChildInputField key={index} form={form} index={index} />
            ))}
          </div>

          <div className="flex justify-between items-center">
            {form.watch('children').length < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const children = form.getValues('children');
                  form.setValue('children', [...children, { name: '', courseName: '', teacherId: '' }]);
                }}
              >
                Add Another Child
              </Button>
            )}
            <Button type="submit">Add Parent</Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
});
