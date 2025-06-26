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
import { addStaffAccount } from "@/api/admin";
import { type CreateStaffRequest } from "@/types/staff";
import { toast } from "sonner";

interface AddStaffDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStaffDialog = ({
  isOpen,
  onOpenChange,
}: AddStaffDialogProps) => {
  const [formData, setFormData] = useState<CreateStaffRequest>({
    email: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const addStaffMutation = useMutation({
    mutationFn: addStaffAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      onOpenChange(false);
      setFormData({
        email: "",
        fullName: "",
        password: "",
      });
      toast.success("Nhân viên đã được thêm thành công!");
    },
    onError: (error: Error) => {
      toast.error(
        `Lỗi khi thêm nhân viên: ${error.message || "Có lỗi xảy ra"}`
      );
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Real-time validation
    let processedValue = value;

    if (name === "fullName") {
      // Chỉ cho phép chữ cái và khoảng trắng
      processedValue = value.replace(/[^a-zA-ZÀ-ỹ\s]/g, "");
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
    if (!formData.email || !formData.fullName) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Validate fullName (chỉ chứa chữ và khoảng trắng)
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(formData.fullName.trim())) {
      toast.error("Họ và tên chỉ được chứa chữ cái và khoảng trắng!");
      return;
    }

    // Validate fullName length
    if (formData.fullName.trim().length < 2) {
      toast.error("Họ và tên phải có ít nhất 2 ký tự!");
      return;
    }

    // Validate password length (nếu có nhập)
    if (formData.password && formData.password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    addStaffMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhân viên
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm nhân viên mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staff-email">Email *</Label>
            <Input
              id="staff-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="staff@example.com"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staff-fullName">Họ và tên *</Label>
            <Input
              id="staff-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn B"
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staff-password">Password</Label>
            <Input
              id="staff-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Tối thiểu 8 ký tự"
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
            <Button type="submit" disabled={addStaffMutation.isPending}>
              {addStaffMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm nhân viên"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
