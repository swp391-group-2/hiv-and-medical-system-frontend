import React, { useEffect, useState } from "react";
import PatientListPending from "@/components/doctorPendingApoinment/patientListPending";
import { TopHeaderPending } from "@/components/doctorPendingApoinment/topHeaderPending";
import axios from "axios";

export interface Appointment {
  appointmentId: number;
  serviceType: string;
  labSample?: { status: string };
  patient: {
    patientId: string;
    userId: string;
    email: string;
    fullName: string;
    userStatus: string;
    patientCode: string;
    dob: Date;
    gender: string;
    address: string;
    phoneNumber: string;
    identificationCard: string;
    healthInsurance: string;
    occupation: string;
  };
  date: string;
  doctorName: string;
  labResult?: {
    resultText: string;
    conclusion: string;
    viralLoad: string;
    cd4: string;
  };
}

// ✅ DỮ LIỆU GIẢ LẬP
const sampleAppointments: Appointment[] = [
  {
    appointmentId: 123,
    serviceType: "CONSULTATION",
    labSample: { status: "LAB_COMPLETED" },
    patient: {
      patientId: "P001",
      userId: "U001",
      email: "benhnhan@example.com",
      fullName: "Nguyễn Văn A",
      userStatus: "active",
      patientCode: "BN001",
      dob: new Date("1990-01-01"),
      gender: "Nam",
      address: "123 Đường ABC, TP.HCM",
      phoneNumber: "0909123456",
      identificationCard: "0123456789",
      healthInsurance: "BH123456",
      occupation: "Nhân viên văn phòng",
    },
    date: "2025-06-12",
    doctorName: "BS. Trần Thị B",
    labResult: {
      resultText: "Tốt",
      conclusion: "Không phát hiện HIV",
      viralLoad: "Không phát hiện",
      cd4: "500 tế bào/mm³",
    },
  },
  {
    appointmentId: 124,
    serviceType: "CONSULTATION",
    labSample: { status: "LAB_COMPLETED" },
    patient: {
      patientId: "P002",
      userId: "U002",
      email: "lethib@example.com",
      fullName: "Lê Thị B",
      userStatus: "active",
      patientCode: "BN002",
      dob: new Date("1985-05-15"),
      gender: "Nữ",
      address: "456 Đường XYZ, Hà Nội",
      phoneNumber: "0912345678",
      identificationCard: "9876543210",
      healthInsurance: "BH654321",
      occupation: "Giáo viên",
    },
    date: "2025-06-11",
    doctorName: "BS. Nguyễn Văn C",
    labResult: {
      resultText: "Ổn định",
      conclusion: "Không phát hiện HIV",
      viralLoad: "Không phát hiện",
      cd4: "600 tế bào/mm³",
    },
  },
];

const PendingAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Hàm fetch dữ liệu
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Appointment[]>(
        "http://localhost:8080/doctor/apoiment"
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách lịch hẹn:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // Nếu muốn chỉ lấy dữ liệu mẫu khi dev, có thể kiểm tra NODE_ENV
    // setAppointments(sampleAppointments);
  }, []);

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-2">Xét nghiệm chờ kết quả</h1>
      <p className="text-gray-600 mb-6">Cập nhật kết quả xét nghiệm</p>
      <TopHeaderPending total={appointments.length} />
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <PatientListPending appointments={appointments} />
      )}
    </main>
  );
};

export default PendingAppointment;
