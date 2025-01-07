import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ManageAccessCodeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  newAccessCode: string;
  onAccessCodeChange: (value: string) => void;
  onUpdateAccessCode: () => void;
  isUpdating: boolean;
};

export const ManageAccessCodeDialog = ({
  isOpen,
  onClose,
  newAccessCode,
  onAccessCodeChange,
  onUpdateAccessCode,
  isUpdating
}: ManageAccessCodeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Access Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="accessCode" className="text-sm font-medium">
              Access Code
            </label>
            <Input
              id="accessCode"
              value={newAccessCode}
              onChange={(e) => onAccessCodeChange(e.target.value)}
              placeholder="Enter new access code"
            />
          </div>
          <Button 
            onClick={onUpdateAccessCode}
            className="w-full"
            disabled={!newAccessCode.trim() || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Access Code"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};