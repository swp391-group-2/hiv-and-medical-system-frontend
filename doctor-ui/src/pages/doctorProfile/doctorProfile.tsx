import React, { useEffect, useRef, useState } from "react";
import {
  getDoctorByEmail,
  updateDoctorProfile,
  uploadDoctorAvatar,
} from "@/api/doctorProfileAPI";
import {
  User,
  Mail,
  Badge,
  Stethoscope,
  FileText,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doctorEmail = localStorage.getItem("doctorEmail") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDoctorByEmail(doctorEmail);
        if (Array.isArray(data)) {
          const foundDoctor = data.find((d) => d.email === doctorEmail);
          if (foundDoctor) {
            setProfile(foundDoctor);
            setAvatarPreview(foundDoctor.urlImage);
          } else {
            console.warn("Không tìm thấy bác sĩ với email:", doctorEmail);
          }
        } else {
          setProfile(data);
          setAvatarPreview(data.urlImage);
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin bác sĩ:", err);
      } finally {
        setLoading(false);
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

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const uploaded = await uploadDoctorAvatar(profile.doctorId, file);
      if (uploaded?.url) {
        const updatedProfile = {
          ...profile,
          urlImage: uploaded.url,
        };

        const result = await updateDoctorProfile(
          profile.doctorId,
          updatedProfile
        );
        setProfile(result.result || result);
        setAvatarPreview(uploaded.url);
        alert("Upload ảnh và cập nhật thành công!");
      }
    } catch (error) {
      console.error("Upload thất bại:", error);
      alert("Upload ảnh thất bại!");
    } finally {
      setUploadingAvatar(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin  h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200">
          <div className="text-center text-red-600">
            <X className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Không có dữ liệu</h3>
            <p>Không thể tải thông tin bác sĩ</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="h-full">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          {/* Avatar and Basic Info */}
          <div className="relative px-8 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  {uploadingAvatar ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <img
                      src={avatarPreview || "/default-avatar.png"}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {editing && (
                  <button
                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 group-hover:scale-110"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    disabled={uploadingAvatar}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={!editing || uploadingAvatar}
                />
              </div>

              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white">
                  {profile.fullName}
                </h2>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                  <Mail className="h-4 w-4 mr-2" />
                  {profile.email}
                </p>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      profile.userStatus === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {profile.userStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="space-y-6">
                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Badge className="h-4 w-4 mr-2 text-blue-600" />
                    Mã bác sĩ
                  </label>
                  <input
                    type="text"
                    name="doctorCode"
                    value={profile.doctorCode}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Stethoscope className="h-4 w-4 mr-2 text-blue-600" />
                    Chuyên khoa
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Mã giấy phép hành nghề
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    Trạng thái tài khoản
                  </label>
                  <input
                    type="text"
                    name="userStatus"
                    value={profile.userStatus}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                      editing
                        ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
              {!editing ? (
                <button
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r  text-white rounded-xl bg-black transition-all duration-200 transform hover:scale-105 shadow-lg"
                  onClick={() => setEditing(true)}
                >
                  <Edit3 className="h-5 w-5 mr-2" />
                  Chỉnh sửa thông tin
                </button>
              ) : (
                <>
                  <button
                    className="flex items-center justify-center px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
                    onClick={() => setEditing(false)}
                    disabled={saving}
                  >
                    <X className="h-5 w-5 mr-2" />
                    Hủy bỏ
                  </button>
                  <button
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Lưu thay đổi
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
