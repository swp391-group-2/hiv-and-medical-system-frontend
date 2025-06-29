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
import { addManagerAccount } from "@/api/admin";

import { toast } from "sonner";

import type { CreateManagerRequest } from "@/types/manager";

interface AddManagerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddManagerDialog = ({
  isOpen,
  onOpenChange,
}: AddManagerDialogProps) => {
  const [formData, setFormData] = useState<CreateManagerRequest>({
    email: "",
    fullName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const addManagerMutation = useMutation({
    mutationFn: addManagerAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
      onOpenChange(false);
      resetForm();
      toast.success("Quản lý đã được thêm thành công!");
    },
    onError: (error: Error) => {
      toast.error(
        `Lỗi khi thêm 1uản lý xét nghiệm: ${error.message || "Có lỗi xảy ra"}`
      );
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    let error = "";
    switch (name) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          error = "Email không đúng định dạng";
        }
        break;
      }
      case "password": {
        if (value && value.length < 8) {
          error = "Mật khẩu phải có ít nhất 8 ký tự";
        }
        break;
      }
      case "fullName": {
        if (value && value.trim().length < 2) {
          error = "Họ và tên phải có ít nhất 2 ký tự";
        }
        break;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email || !formData.fullName || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Check if there are any validation errors
    if (errors.email || errors.fullName || errors.password) {
      toast.error("Vui lòng sửa các lỗi trước khi tiếp tục!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không đúng định dạng!");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    // Validate full name length
    if (formData.fullName.trim().length < 2) {
      toast.error("Họ và tên phải có ít nhất 2 ký tự!");
      return;
    }

    addManagerMutation.mutate(formData);
  };

  const resetForm = () => {
    setFormData({
      email: "",
      fullName: "",
      password: "",
    });
    setErrors({
      email: "",
      fullName: "",
      password: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm quản lý xét nghiệm
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm quản lý xét nghiệm mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manager-email">Email *</Label>
            <Input
              id="manager-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="manager@example.com"
              required
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager-fullName">Họ và tên *</Label>
            <Input
              id="manager-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn B"
              required
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager-password">
              Password * (tối thiểu 8 ký tự)
            </Label>
            <Input
              id="manager-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
              minLength={8}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={
                addManagerMutation.isPending ||
                !formData.email ||
                !formData.fullName ||
                !formData.password ||
                !!errors.email ||
                !!errors.fullName ||
                !!errors.password
              }
            >
              {addManagerMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm quản lý xét nghiệm"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
