import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { updateDoctorAccount } from "@/api/admin";
import { type Doctor, type UpdateDoctorRequest } from "@/types/doctor";
import { toast } from "sonner";

interface UpdateDoctorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor | null;
}

export const UpdateDoctorDialog = ({
  isOpen,
  onOpenChange,
  doctor,
}: UpdateDoctorDialogProps) => {
  const [formData, setFormData] = useState<UpdateDoctorRequest>({
    fullName: "",
    specialization: "",
    licenseNumber: "",
  });

  const queryClient = useQueryClient();

  // Update form data when doctor changes
  useEffect(() => {
    if (doctor) {
      setFormData({
        fullName: doctor.fullName,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
      });
    }
  }, [doctor]);

  const updateDoctorMutation = useMutation({
    mutationFn: ({
      doctorId,
      updateData,
    }: {
      doctorId: string;
      updateData: UpdateDoctorRequest;
    }) => updateDoctorAccount(doctorId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onOpenChange(false);
      toast.success("Bác sĩ đã được cập nhật thành công!");
    },
    onError: (error: Error) => {
      toast.error(`Lỗi khi cập nhật bác sĩ: ${error.message || "Có lỗi xảy ra"}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctor) return;

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.specialization ||
      !formData.licenseNumber
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    updateDoctorMutation.mutate({
      doctorId: doctor.doctorId,
      updateData: formData,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin bác sĩ</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-fullName">Họ và tên *</Label>
            <Input
              id="update-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-specialization">Chuyên khoa *</Label>
            <Input
              id="update-specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Nội khoa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-licenseNumber">
              Số giấy phép hành nghề *
            </Label>
            <Input
              id="update-licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder="123456789"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={updateDoctorMutation.isPending}>
              {updateDoctorMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang cập nhật...
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
