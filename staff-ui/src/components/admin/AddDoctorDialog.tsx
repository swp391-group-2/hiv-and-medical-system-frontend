import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { addDoctorAccount } from "@/api/admin";
import { type CreateDoctorRequest } from "@/types/doctor";
import { toast } from "sonner";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDoctorDialog = ({
  isOpen,
  onOpenChange,
}: AddDoctorDialogProps) => {
  const [formData, setFormData] = useState<CreateDoctorRequest>({
    email: "",
    fullName: "",
    doctorCode: "",
    specialization: "",
    licenseNumber: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const addDoctorMutation = useMutation({
    mutationFn: addDoctorAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onOpenChange(false);
      setFormData({
        email: "",
        fullName: "",
        doctorCode: "",
        specialization: "",
        licenseNumber: "",
        password: "",
      });
      toast.success("Bác sĩ đã được thêm thành công!");
    },
    onError: (error: Error) => {
      toast.error(`Lỗi khi thêm bác sĩ: ${error.message || "Có lỗi xảy ra"}`);
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

    // Validate required fields
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.specialization ||
      !formData.licenseNumber
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    addDoctorMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm bác sĩ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm bác sĩ mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="doctor@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctorCode">Mã bác sĩ *</Label>
            <Input
              id="doctorCode"
              name="doctorCode"
              value={formData.doctorCode}
              onChange={handleInputChange}
              placeholder="BS001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Chuyên khoa *</Label>
            <Input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Nội khoa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Số giấy phép hành nghề *</Label>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              placeholder="123456789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Vd:123456"
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
            <Button type="submit" disabled={addDoctorMutation.isPending}>
              {addDoctorMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm bác sĩ"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
