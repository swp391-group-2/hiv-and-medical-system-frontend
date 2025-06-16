import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SampleTestForm, SampleConsultForm } from "./sampling-form";
import type { Appointment } from "@/types/types";

interface ConfirmCheckinDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientName: string;
  appt: Appointment;
}

export function ConfirmCheckinDialog({
  open,
  setOpen,
  patientName,
  appt,
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

        {appt.serviceType === "CONSULTATION" ? (
          <SampleConsultForm appt={appt} />
        ) : (
          <SampleTestForm appt={appt} />
        )}

        <DialogFooter className="flex justify-end gap-2"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
