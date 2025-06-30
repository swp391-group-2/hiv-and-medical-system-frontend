import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { type Doctor } from "@/types/doctor";
import { activeUserAccount } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ActiveDoctorDialogProps {
  doctor: Doctor;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ActiveDoctorDialog = ({
  doctor,
  isOpen,
  onOpenChange,
}: ActiveDoctorDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const activeMutation = useMutation({
    mutationFn: () => activeUserAccount(doctor.userId),
    onSuccess: () => {
      toast.success("Kích hoạt tài khoản bác sĩ thành công");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to activate doctor:", error);
      toast.error("Không thể kích hoạt tài khoản bác sĩ. Vui lòng thử lại.");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleActive = () => {
    setIsLoading(true);
    activeMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kích hoạt lại tài khoản bác sĩ</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn kích hoạt lại tài khoản của bác sĩ{" "}
            <span className="font-semibold">{doctor.fullName}</span> (
            {doctor.doctorCode})?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Mã bác sĩ:</span>{" "}
              {doctor.doctorCode}
            </div>
            <div className="text-sm">
              <span className="font-medium">Email:</span> {doctor.email}
            </div>
            <div className="text-sm">
              <span className="font-medium">Chuyên khoa:</span>{" "}
              {doctor.specialization}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button onClick={handleActive} disabled={isLoading}>
            {isLoading ? "Đang kích hoạt..." : "Kích hoạt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
