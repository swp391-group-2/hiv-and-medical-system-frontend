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
        <DialogHeader className="mb-5">
          <DialogTitle className="flex flex-col gap-4">
            <span className="font-semibold">Mã số: {appt.appointmentCode}</span>

            <span className="font-semibold">
              Xác nhận check-in cho {patientName}
            </span>
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
