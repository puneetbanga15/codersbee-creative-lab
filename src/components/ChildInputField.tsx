import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TeacherSelect } from "./TeacherSelect";

interface ChildInputFieldProps {
  form: UseFormReturn<any>;
  index: number;
}

export const ChildInputField = ({ form, index }: ChildInputFieldProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <FormField
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

      <FormField
        control={form.control}
        name={`children.${index}.courseName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter course name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <TeacherSelect form={form} index={index} />
    </div>
  );
};