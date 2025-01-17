import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";

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

  // Get the current domain for the verification URL
  const verificationUrl = window.location.hostname === 'localhost' 
    ? `${window.location.origin}/certificate`
    : `https://bright-froyo-1a1f7e.netlify.app/certificate`;

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

              <div id="certificate-template" className="p-8 bg-gradient-to-b from-codersbee-purple/20 to-white border-8 border-codersbee-orange/30 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-codersbee-yellow rounded-br-full animate-float" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-codersbee-yellow rounded-bl-full animate-float" />
                <div className="text-center space-y-6 relative z-10">
                  <img 
                    src="/lovable-uploads/96665488-c73d-4daf-a6f2-5dc7d468a820.png" 
                    alt="Codersbee Logo" 
                    className="mx-auto h-20"
                  />
                  <div className="absolute -right-4 top-20 w-12 h-12 bg-codersbee-orange/40 rounded-full animate-float" />
                  <div className="absolute -left-4 top-32 w-8 h-8 bg-codersbee-yellow/40 rounded-full animate-float" />
                  <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Certificate of Completion</h1>
                  <p className="text-lg">This is to certify that</p>
                  <p className="text-2xl font-bold text-codersbee-vivid">
                    {form.watch("studentName") || "[Student Name]"}
                  </p>
                  <p className="text-lg">has successfully completed the course</p>
                  <p className="text-xl font-semibold">
                    {form.watch("courseName") || "[Course Name]"}
                  </p>
                  <p className="text-base italic max-w-3xl mx-auto">
                    {form.watch("performance") || "[Performance Details]"}
                  </p>
                  <div className="mt-12 pt-8 border-t border-codersbee-orange/30 flex justify-between items-end px-12">
                    <div className="text-center flex-1">
                      <div className="flex flex-col items-center">
                        <img 
                          src="/lovable-uploads/90d70763-3e56-417d-8601-31c24b3d8f56.png"
                          alt="Director's Signature"
                          className="h-12 mb-2"
                        />
                        <p className="font-semibold">Manisha Kapoor</p>
                        <p className="text-sm text-gray-600">Director, Codersbee Education LLP</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-32">
                      <p className="text-xs text-gray-600 mb-2 text-center">Validate this certificate</p>
                      <QRCodeSVG
                        value={`${verificationUrl}?name=${form.watch("studentName")}&course=${form.watch("courseName")}`}
                        size={80}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
                  <div className="flex justify-between px-8">
                    <div className="w-8 h-8 bg-codersbee-yellow/40 rounded-full animate-float" />
                    <div className="w-6 h-6 bg-codersbee-orange/30 rounded-full animate-float" />
                    <div className="w-10 h-10 bg-codersbee-purple/30 rounded-full animate-float" />
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
