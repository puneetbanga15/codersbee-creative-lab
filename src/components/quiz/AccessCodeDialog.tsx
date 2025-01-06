import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AccessCodeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  accessCode: string;
  onAccessCodeChange: (value: string) => void;
  onSubmit: () => void;
};

export const AccessCodeDialog = ({
  isOpen,
  onClose,
  accessCode,
  onAccessCodeChange,
  onSubmit,
}: AccessCodeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Access Code</DialogTitle>
          <DialogDescription>
            This is a premium quiz. Please enter your access code to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Access Code"
            value={accessCode}
            onChange={(e) => onAccessCodeChange(e.target.value)}
          />
          <Button className="w-full" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};