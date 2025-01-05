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

const formSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  timezone: z.string().min(1, "Please select a timezone"),
  children: z.array(z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    courseName: z.string().min(2, "Course name must be at least 2 characters"),
    teacherId: z.string().min(1, "Please select a teacher"),
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
      children: [{ name: "", courseName: "", teacherId: "" }],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
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

      for (const child of values.children) {
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .insert({
            full_name: child.name,
            parent_id: authData.user?.id,
            timezone: values.timezone,
          })
          .select()
          .single();

        if (studentError) throw studentError;

        const { error: enrollmentError } = await supabase
          .from('course_enrollments')
          .insert({
            student_id: studentData.id,
            course_name: child.courseName,
            teacher_id: child.teacherId,
          });

        if (enrollmentError) throw enrollmentError;
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
        <ParentFormFields form={form} />
        
        {form.watch('children').map((_, index) => (
          <ChildInputField key={index} form={form} index={index} />
        ))}

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

        <Button type="submit" className="w-full">Add Parent</Button>
      </form>
    </Form>
  );
};