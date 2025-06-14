import React, { useEffect, useState } from "react";
import { fetchDoctorById, updateDoctorProfile } from "@/api/doctorProfileAPI";
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
}

const DoctorProfile: React.FC = () => {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const doctorId = "abc123"; // hoặc lấy từ context/token/localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDoctorById(doctorId);
        setProfile(data.result); // tùy theo response của API
      } catch {
        console.error("Không thể tải thông tin bác sĩ");
      }
    };
    fetchData();
  }, [doctorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const updated = await updateDoctorProfile(profile.doctorId, profile);
      alert("Cập nhật thành công!");
      setProfile(updated.result); // Nếu API trả về profile mới
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin bác sĩ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField label="Họ và tên" name="fullName" value={profile.fullName} onChange={handleChange} disabled={!editing} />
        <ProfileField label="Email" name="email" value={profile.email} onChange={handleChange} disabled={!editing} />
        <ProfileField label="Mã bác sĩ" name="doctorCode" value={profile.doctorCode} onChange={handleChange} disabled={!editing} />
        <ProfileField label="Chuyên khoa" name="specialization" value={profile.specialization} onChange={handleChange} disabled={!editing} />
        <ProfileField label="Mã giấy phép hành nghề" name="licenseNumber" value={profile.licenseNumber} onChange={handleChange} disabled={!editing} />
        <ProfileField label="Trạng thái tài khoản" name="userStatus" value={profile.userStatus} onChange={handleChange} disabled={!editing} />
      </div>

      <div className="flex justify-end mt-8 space-x-2">
        {!editing ? (
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600" onClick={() => setEditing(true)}>
            Chỉnh sửa
          </button>
        ) : (
          <>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500" onClick={() => setEditing(false)} disabled={saving}>
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
