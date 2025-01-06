import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Key, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AccessCodeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  accessCode: string;
  onAccessCodeChange: (value: string) => void;
  onSubmit: () => void;
  error?: string;
  isLoading?: boolean;
};

export const AccessCodeDialog = ({
  isOpen,
  onClose,
  accessCode,
  onAccessCodeChange,
  onSubmit,
  error,
  isLoading = false,
}: AccessCodeDialogProps) => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <DialogTitle>Enter Access Code</DialogTitle>
          </div>
          <DialogDescription>
            This is a premium quiz. Please enter your access code to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => {
                setShowError(false);
                onAccessCodeChange(e.target.value);
              }}
              className="flex-1"
            />
          </div>
          
          {(showError || error) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || "Please enter a valid access code"}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};