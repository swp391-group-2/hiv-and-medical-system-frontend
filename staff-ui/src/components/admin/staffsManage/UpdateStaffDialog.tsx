import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateStaffFullName } from "@/api/admin";
import { type Staff } from "@/types/staff";

interface UpdateStaffDialogProps {
  staff: Staff;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateStaffDialog = ({
  staff,
  isOpen,
  onOpenChange,
}: UpdateStaffDialogProps) => {
  const [fullName, setFullName] = useState(staff.fullName);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (newName: string) =>
      updateStaffFullName(staff.staffId, newName),
    onSuccess: () => {
      toast.success("Cập nhật tên nhân viên thành công");
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      onOpenChange(false);
      setFullName(staff.fullName); // Reset form
    },
    onError: () => {
      toast.error("Không thể cập nhật tên nhân viên");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && fullName !== staff.fullName) {
      updateMutation.mutate(fullName.trim());
    }
  };

  const handleCancel = () => {
    setFullName(staff.fullName); // Reset form
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật tên nhân viên</DialogTitle>
          <DialogDescription>
            Thay đổi tên của nhân viên: {staff.fullName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Họ và tên
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="col-span-3"
                placeholder="Nhập họ và tên mới"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={updateMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={
                updateMutation.isPending ||
                !fullName.trim() ||
                fullName === staff.fullName
              }
            >
              {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
