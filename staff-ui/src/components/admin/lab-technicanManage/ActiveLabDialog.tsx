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

import { activeStaffAccount } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LabTechnician } from "@/types/lab-technicians";

interface ActiveLabDialogProps {
  lab: LabTechnician;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ActiveLabDialog = ({
  lab,
  isOpen,
  onOpenChange,
}: ActiveLabDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const activeMutation = useMutation({
    mutationFn: () => activeStaffAccount(lab.labTechnicianId),
    onSuccess: () => {
      toast.success("Kích hoạt tài khoản nhân viên thành công");
      queryClient.invalidateQueries({ queryKey: ["labs"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to activate lab:", error);
      toast.error("Không thể kích hoạt tài khoản nhân viên. Vui lòng thử lại.");
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
          <DialogTitle>Kích hoạt lại tài khoản nhân viên</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn kích hoạt lại tài khoản của nhân viên{" "}
            <span className="font-semibold">{lab.fullName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {/* <div className="text-sm">
              <span className="font-medium">Mã nhân viên:</span>{" "}
              {lab.staffCode}
            </div> */}
            <div className="text-sm">
              <span className="font-medium">Email:</span> {lab.email}
            </div>
            <div className="text-sm">
              <span className="font-medium">Vai trò:</span> {lab.role}
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
