import React, { useEffect, useRef, useState } from "react";
import {
  getDoctorByEmail,
  updateDoctorProfile,
  uploadDoctorAvatar,
} from "@/api/doctorProfileAPI";
import ProfileField from "@/components/DoctorProfile/doctorProfileFiled";

interface DoctorProfile {
  doctorId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  doctorCode: string;
  specialization: string;
  licenseNumber: string;
  urlImage?: string;
}

const DoctorProfile: React.FC = () => {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doctorEmail = localStorage.getItem("doctorEmail") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDoctorByEmail(doctorEmail);
        if (Array.isArray(data)) {
          const foundDoctor = data.find((d) => d.email === doctorEmail);
          if (foundDoctor) {
            setProfile(foundDoctor);
            setAvatarPreview(foundDoctor.urlImage); // ✅ sử dụng đúng field
          } else {
            console.warn("Không tìm thấy bác sĩ với email:", doctorEmail);
          }
        } else {
          setProfile(data);
          setAvatarPreview(data.urlImage); // ✅ sử dụng đúng field
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin bác sĩ:", err);
      }
    };

    if (doctorEmail) {
      fetchData();
    }
  }, [doctorEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Sử dụng doctorId thay vì email
      const uploaded = await uploadDoctorAvatar(profile.doctorId, file);
      if (uploaded?.url) {
        const updatedProfile = {
          ...profile,
          urlImage: uploaded.url,
        };

        const result = await updateDoctorProfile(profile.doctorId, updatedProfile);
     
        setProfile(result.result || result);
        setAvatarPreview(uploaded.url);
        alert("Upload ảnh và cập nhật thành công!");
      }
    } catch (error) {
      console.log(profile.doctorId)
      
      console.error("Upload thất bại:", error);
      alert("Upload ảnh thất bại!");
    }
  };
  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const updated = await updateDoctorProfile(profile.doctorId, profile);
      alert("Cập nhật thành công!");
      setProfile(updated.result || updated);
      setEditing(false);
    } catch {
      alert("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return <div className="p-8 text-red-600">⚠️ Không có dữ liệu bác sĩ</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Thông tin bác sĩ
      </h2>
      <div className="flex items-center mb-8">
        <div className="relative w-28 h-28 mr-6">
          <img
            src={avatarPreview || "/default-avatar.png"}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-300"
          />
          {editing && (
            <button
              className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Đổi ảnh
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            disabled={!editing}
          />
        </div>
        <div className="text-gray-600">
          <div className="font-semibold">{profile.fullName}</div>
          <div>{profile.email}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField
          label="Họ và tên"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          disabled={!editing}
        />
        <ProfileField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={!editing}
        />
        <ProfileField
          label="Mã bác sĩ"
          name="doctorCode"
          value={profile.doctorCode}
          onChange={handleChange}
          disabled={!editing}
        />
        <ProfileField
          label="Chuyên khoa"
          name="specialization"
          value={profile.specialization}
          onChange={handleChange}
          disabled={!editing}
        />
        <ProfileField
          label="Mã giấy phép hành nghề"
          name="licenseNumber"
          value={profile.licenseNumber}
          onChange={handleChange}
          disabled={!editing}
        />
        <ProfileField
          label="Trạng thái tài khoản"
          name="userStatus"
          value={profile.userStatus}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      <div className="flex justify-end mt-8 space-x-2">
        {!editing ? (
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
            onClick={() => setEditing(true)}
          >
            Chỉnh sửa
          </button>
        ) : (
          <>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
