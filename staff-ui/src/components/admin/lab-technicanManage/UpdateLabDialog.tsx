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
import { updateLabTechnicianFullName } from "@/api/admin";
import type { LabTechnician } from "@/types/lab-technicians";

interface UpdateLabDialogProps {
  lab: LabTechnician;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateLabDialog = ({
  lab,
  isOpen,
  onOpenChange,
}: UpdateLabDialogProps) => {
  const [fullName, setFullName] = useState(lab.fullName);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (newName: string) =>
      updateLabTechnicianFullName(lab.userId || lab.labTechnicianId, newName),
    onSuccess: () => {
      toast.success("Cập nhật tên nhân viên phòng lab thành công");
      queryClient.invalidateQueries({ queryKey: ["labs"] });
      onOpenChange(false);
      setFullName(lab.fullName); // Reset form
    },
    onError: () => {
      toast.error("Không thể cập nhật tên nhân viên phòng lab");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && fullName !== lab.fullName) {
      updateMutation.mutate(fullName.trim());
    }
  };

  const handleCancel = () => {
    setFullName(lab.fullName); // Reset form
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật tên nhân viên phòng lab</DialogTitle>
          <DialogDescription>
            Thay đổi tên của nhân viên: {lab.fullName}
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
                fullName === lab.fullName
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
