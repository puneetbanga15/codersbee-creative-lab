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

interface ChildInputFieldProps {
  form: UseFormReturn<any>;
  index: number;
}

export const ChildInputField = ({ form, index }: ChildInputFieldProps) => {
  return (
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
  );
};