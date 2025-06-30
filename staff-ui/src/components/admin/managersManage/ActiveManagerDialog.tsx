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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Manager } from "@/types/manager";
import { activeStaffAccount } from "@/api/admin";

interface ActiveManagerDialogProps {
 manager: Manager
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ActiveManagerDialog = ({
  manager,
  isOpen,
  onOpenChange,
}: ActiveManagerDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const activeMutation = useMutation({
    mutationFn: () => activeStaffAccount(manager.managerId),
    onSuccess: () => {
      toast.success("Kích hoạt tài khoản quản lý thành công");
      queryClient.invalidateQueries({ queryKey: ["managers"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Failed to activate manager:", error);
      toast.error("Không thể kích hoạt tài khoản quản lý. Vui lòng thử lại.");
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
          <DialogTitle>Kích hoạt lại tài khoản quản lý</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn kích hoạt lại tài khoản của nhân viên{" "}
            <span className="font-semibold">{manager.fullName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {/* <div className="text-sm">
              <span className="font-medium">Mã nhân viên:</span>{" "}
              {lab.staffCode}
            </div> */}
            <div className="text-sm">
              <span className="font-medium">Email:</span> {manager.email}
            </div>
            <div className="text-sm">
              <span className="font-medium">Vai trò:</span> {manager.role}
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
