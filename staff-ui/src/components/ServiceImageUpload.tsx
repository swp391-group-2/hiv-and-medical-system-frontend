import React, { useState, useRef } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { validateImageFile, fileToBase64 } from "@/utils/imageUtils";

interface ServiceImageUploadProps {
  currentImageUrl?: string;
  onImageSelect: (file: File | null) => void;
  onImageRemove: () => void;
  disabled?: boolean;
  className?: string;
}

const ServiceImageUpload: React.FC<ServiceImageUploadProps> = ({
  currentImageUrl,
  onImageSelect,
  onImageRemove,
  disabled = false,
  className = "",
}) => {
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null
  );
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || "File không hợp lệ");
      return;
    }

    try {
      // Create preview
      const base64 = await fileToBase64(file);
      setPreview(base64);
      onImageSelect(file);
    } catch (err) {
      setError("Lỗi khi xử lý file ảnh");
      console.error("Error processing image:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onImageRemove();
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Hình ảnh dịch vụ
      </label>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "border-red-300 bg-red-50" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Service preview"
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              {error ? (
                <AlertCircle className="w-full h-full text-red-400" />
              ) : (
                <Upload className="w-full h-full" />
              )}
            </div>

            <div>
              <p className="text-gray-600 font-medium">
                {error ? error : "Kéo thả ảnh vào đây hoặc click để chọn"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, GIF tối đa 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Current Image Display */}
      {currentImageUrl && !preview && (
        <div className="relative">
          <p className="text-sm text-gray-600 mb-2">Ảnh hiện tại:</p>
          <div className="relative inline-block">
            <img
              src={currentImageUrl}
              alt="Current service image"
              className="max-h-32 rounded-lg object-cover border"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xs"
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500">
        <p>• Kích thước đề xuất: 800x600px</p>
        <p>• Định dạng: JPEG, PNG, GIF, WebP</p>
        <p>• Dung lượng tối đa: 5MB</p>
      </div>
    </div>
  );
};

export default ServiceImageUpload;
