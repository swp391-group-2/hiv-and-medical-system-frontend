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

import { disableStaffAccount } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LabTechnician } from "@/types/lab-technicians";

interface DisableLabDialogProps {
  lab: LabTechnician;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DisableLabDialog = ({
  lab,
  isOpen,
  onOpenChange,
}: DisableLabDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const disableMutation = useMutation({
    mutationFn: () => disableStaffAccount(lab.labTechnicianId),
    onSuccess: () => {
      toast.success("Vô hiệu hóa tài khoản nhân viên xét nghiệm thành công");
      queryClient.invalidateQueries({ queryKey: ["labs"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to disable lab:", error);
      toast.error(
        "Không thể vô hiệu hóa tài khoản nhân viên xét nghiệm. Vui lòng thử lại."
      );
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleDisable = () => {
    setIsLoading(true);
    disableMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vô hiệu hóa tài khoản nhân viên xét nghiệm</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn vô hiệu hóa tài khoản của nhân viên xét nghiệm{" "}
            <span className="font-semibold">{lab.fullName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {/* <div className="text-sm">
              <span className="font-medium">Mã nhân viên:</span>{" "}
              {lab.}
            </div> */}
            <div className="text-sm">
              <span className="font-medium">Email:</span> {lab.email}
            </div>
            <div className="text-sm">
              <span className="font-medium">Vai trò:</span> {lab.role}
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              ⚠️ Tài khoản sẽ không thể đăng nhập sau khi bị vô hiệu hóa.
            </p>
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
          <Button
            variant="destructive"
            onClick={handleDisable}
            disabled={isLoading}
          >
            {isLoading ? "Đang vô hiệu hóa..." : "Vô hiệu hóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
