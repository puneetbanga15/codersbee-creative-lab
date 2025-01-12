import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  courseName: z.string().min(1, "Course name is required"),
  performance: z.string().min(1, "Performance details are required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCertificateDialog = ({ open, onOpenChange }: CreateCertificateDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      courseName: "",
      performance: "",
    },
  });

  const generatePDF = async (data: FormValues) => {
    const certificate = document.getElementById('certificate-template');
    if (!certificate) return;

    const canvas = await html2canvas(certificate);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${data.studentName}-certificate.pdf`);
  };

  const onSubmit = async (data: FormValues) => {
    await generatePDF(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create Certificate</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performance Details</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div id="certificate-template" className="p-8 bg-white border rounded-lg mb-4">
                <div className="text-center space-y-6">
                  <img 
                    src="/lovable-uploads/codersbee-logo.png" 
                    alt="Codersbee Logo" 
                    className="mx-auto h-20"
                  />
                  <h1 className="text-3xl font-bold text-gray-900">Certificate of Completion</h1>
                  <p className="text-lg">This is to certify that</p>
                  <p className="text-2xl font-bold text-codersbee-vivid">
                    {form.watch("studentName") || "[Student Name]"}
                  </p>
                  <p className="text-lg">has successfully completed the course</p>
                  <p className="text-xl font-semibold">
                    {form.watch("courseName") || "[Course Name]"}
                  </p>
                  <p className="text-base italic">
                    {form.watch("performance") || "[Performance Details]"}
                  </p>
                  <div className="mt-12 pt-8 border-t">
                    <p className="font-semibold">Manisha Kapoor</p>
                    <p className="text-sm text-gray-600">Director, Codersbee Education LLP</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Generate Certificate</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};