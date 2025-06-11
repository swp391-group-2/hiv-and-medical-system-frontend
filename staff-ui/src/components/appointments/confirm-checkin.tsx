import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  onConfirm,
}: ConfirmCheckinDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Xác nhận check-in cho{" "}
            <span className="font-semibold">{patientName}</span>
          </DialogTitle>
        </DialogHeader>

        <p className="py-4">
          Bạn có chắc chắn muốn check-in cho <strong>{patientName}</strong>?
          Hành động này không thể hoàn tác.
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
