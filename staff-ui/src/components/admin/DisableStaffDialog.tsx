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
import { type Staff } from "@/types/staff";
import { disableUserAccount } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DisableStaffDialogProps {
  staff: Staff;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DisableStaffDialog = ({
  staff,
  isOpen,
  onOpenChange,
}: DisableStaffDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const disableMutation = useMutation({
    mutationFn: () => disableUserAccount(staff.userId),
    onSuccess: () => {
      toast.success("Vô hiệu hóa tài khoản nhân viên thành công");
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to disable staff:", error);
      toast.error(
        "Không thể vô hiệu hóa tài khoản nhân viên. Vui lòng thử lại."
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
          <DialogTitle>Vô hiệu hóa tài khoản nhân viên</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn vô hiệu hóa tài khoản của nhân viên{" "}
            <span className="font-semibold">{staff.fullName}</span> (
            {staff.staffCode})?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Mã nhân viên:</span>{" "}
              {staff.staffCode}
            </div>
            <div className="text-sm">
              <span className="font-medium">Email:</span> {staff.email}
            </div>
            <div className="text-sm">
              <span className="font-medium">Vai trò:</span> {staff.role}
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
