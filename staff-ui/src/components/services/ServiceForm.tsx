import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import type { Service, UpdateServiceRequest } from "@/types/services";
import { SERVICE_TYPE_LABELS } from "@/types/services";
import ServiceImageUpload from "@/components/ServiceImageUpload";

interface ServiceFormProps {
  service: Service; // Service bắt buộc phải có vì chỉ dùng để edit
  onSubmit: (data: UpdateServiceRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}
const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: service.name || "",
    price: service.price?.toString() || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên dịch vụ không được để trống";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Giá dịch vụ không được để trống";
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = "Giá dịch vụ phải là số dương";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        file: selectedImage || undefined, // Gửi file trực tiếp (giống updateBlog)
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Chỉnh sửa dịch vụ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên dịch vụ */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên dịch vụ *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nhập tên dịch vụ"
              disabled={loading}
            />
            {errors.name && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.name}
              </div>
            )}
          </div>

          {/* Giá dịch vụ */}
          <div className="space-y-2">
            <Label htmlFor="price">Giá dịch vụ (VNĐ) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="Nhập giá dịch vụ"
              min="0"
              step="1000"
              disabled={loading}
            />
            {errors.price && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.price}
              </div>
            )}
          </div>

          {/* Loại dịch vụ - Read only */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">Loại dịch vụ</Label>
            <Input
              id="serviceType"
              value={
                SERVICE_TYPE_LABELS[service.serviceType] || service.serviceType
              }
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Loại dịch vụ không thể thay đổi
            </p>
          </div>

          {/* Hình ảnh dịch vụ */}
          <div className="space-y-2">
            <ServiceImageUpload
              currentImageUrl={service.imageUrl}
              onImageSelect={setSelectedImage}
              onImageRemove={() => setSelectedImage(null)}
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
