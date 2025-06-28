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
import { activeStaffAccount } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ActiveStaffDialogProps {
  staff: Staff;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ActiveStaffDialog = ({
  staff,
  isOpen,
  onOpenChange,
}: ActiveStaffDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const activeMutation = useMutation({
    mutationFn: () => activeStaffAccount(staff.staffId),
    onSuccess: () => {
      toast.success("Kích hoạt tài khoản nhân viên thành công");
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to activate staff:", error);
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
