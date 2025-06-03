import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import React from "react";

type AvatarUploadProps = {
  imageUrl: string;
  onUpload: (file: File) => void;
  size?: number;
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  imageUrl,
  onUpload,
  size = 112,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(imageUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative flex flex-col items-center"
        style={{ width: size, height: size }}
      >
        <div
          className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={handleClick}
        >
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-10 h-10 text-blue-500" />
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
