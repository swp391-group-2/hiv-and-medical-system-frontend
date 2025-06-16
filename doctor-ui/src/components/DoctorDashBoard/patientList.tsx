import { useEffect, useState } from "react";
import { getAllAppointments } from "@/api/doctorDashboardAPI";
import type { Patient } from "@/types/patientType";
import PatientCard from "./patientCard";

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllAppointments();

        const today = new Date().toISOString().split("T")[0];
        const todayPatients = data.filter((a: any) => a.date === today).map((a: any) => ({
          name: a.patient?.fullName || "Ẩn danh",
          time: a.time || "00:00",
          type: a.type || "Định kỳ",
          initials: a.patient?.fullName?.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() || "BN",
          status: a.status || "Chờ khám",
        }));

        setPatients(todayPatients);
      } catch (error) {
        console.error("Không thể tải danh sách bệnh nhân:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">👥 Bệnh nhân hôm nay</h2>
      <div className="space-y-4">
        {patients.map((patient, index) => (
          <PatientCard key={index} patient={patient} />
        ))}
      </div>
      <button className="mt-4 text-center w-full text-sm text-blue-600 hover:underline">
        Xem tất cả lịch hẹn
      </button>
    </div>
  );
};

export default PatientList;
