import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const course = searchParams.get("course");

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/20 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Certificate Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">
            This is to confirm that this is an authentic certificate issued by Codersbee Education LLP.
          </p>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-medium">Certificate Details:</p>
            <p>Student Name: {name}</p>
            <p>Course: {course}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}