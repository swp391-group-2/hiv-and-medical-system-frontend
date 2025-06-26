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

    // Real-time validation
    let processedValue = value;

    if (name === "fullName") {
      // Chỉ cho phép chữ cái và khoảng trắng
      processedValue = value.replace(/[^a-zA-ZÀ-ỹ\s]/g, "");
    } else if (name === "doctorCode") {
      // Chỉ cho phép chữ in hoa và số
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (name === "licenseNumber") {
      // Chỉ cho phép chữ cái, số và dấu gạch ngang
      processedValue = value.replace(/[^A-Za-z0-9\-/]/g, "");
    } else if (name === "email") {
      // Loại bỏ khoảng trắng
      processedValue = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

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

    // Validate fullName (chỉ chứa chữ và khoảng trắng)
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(formData.fullName.trim())) {
      toast.error("Họ và tên chỉ được chứa chữ cái và khoảng trắng!");
      return;
    }

    // Validate doctorCode format (ví dụ: BS001, DOC123)
    if (formData.doctorCode && !/^[A-Z0-9]+$/.test(formData.doctorCode)) {
      toast.error("Mã bác sĩ chỉ được chứa chữ in hoa và số!");
      return;
    }

    // Validate licenseNumber (chữ và số, không được trống)
    if (!formData.licenseNumber.trim()) {
      toast.error("Số giấy phép hành nghề không được để trống!");
      return;
    }

    // Validate licenseNumber format (chỉ cho phép chữ, số và một số ký tự đặc biệt)
    if (!/^[A-Za-z0-9\-/]+$/.test(formData.licenseNumber)) {
      toast.error("Số giấy phép chỉ được chứa chữ cái, số và dấu gạch ngang!");
      return;
    }

    // Validate specialization (không được trống hoặc chỉ khoảng trắng)
    if (!formData.specialization.trim()) {
      toast.error("Chuyên khoa không được để trống!");
      return;
    }

    // Validate password length (nếu có nhập)
    if (formData.password && formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
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
              maxLength={100}
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
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctorCode">Mã bác sĩ</Label>
            <Input
              id="doctorCode"
              name="doctorCode"
              value={formData.doctorCode}
              onChange={handleInputChange}
              placeholder="BS001"
              maxLength={10}
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
              maxLength={50}
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
              placeholder="VD: BS123456 hoặc DOC-2024/001"
              maxLength={20}
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
              placeholder="Tối thiểu 6 ký tự"
              maxLength={50}
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
