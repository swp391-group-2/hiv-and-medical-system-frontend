import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SampleForm } from "./sampling-form";

interface ConfirmCheckinDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientName: string;
  onConfirm: () => void;
}

export function ConfirmCheckinDialog({
  open,
  setOpen,
  patientName,
}: ConfirmCheckinDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Xác nhận check-in cho{" "}
            <span className="font-semibold">{patientName}</span>
          </DialogTitle>
        </DialogHeader>

        <SampleForm />

        <DialogFooter className="flex justify-end gap-2"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
