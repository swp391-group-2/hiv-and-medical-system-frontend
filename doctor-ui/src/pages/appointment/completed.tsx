import PatientListManage from "@/components/PatientManagement/patientListManage";
import  { useEffect, useState } from "react";
import type { Patient } from "../../types/patientType";
import { fetchCompletedAppointmentsByDoctor } from "@/api/doctorFetchPatientCompleteAPI";
import HeaderStats from "@/components/PatientManagement/headerStats.t";
import type { Appointment } from "@/types/appointment";


const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Lấy các appointment đã hoàn thành của bác sĩ
        const appointmentsData = await fetchCompletedAppointmentsByDoctor();
        setAppointments(appointmentsData);

        // Lấy danh sách bệnh nhân từ các appointment này (loại trùng)
        const uniquePatients: Record<string, Patient> = {};
        appointmentsData.forEach((a) => {
          if (a.patient && a.patient.patientId) {
            uniquePatients[a.patient.patientId] = a.patient;
          }
        });
        setPatients(Object.values(uniquePatients));
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">Xét nghiệm đã hoàn thành</h1>
      <p className="text-gray-600 mb-6">
        Thông tin và lịch sử xét nghiệm của bệnh nhân
      </p>

      <HeaderStats
        totalPatients={patients.length}
        totalTests={appointments.length}
        testsLast30Days={
          appointments.filter((a) => {
            const dateStr = a.date;
            if (!dateStr) return false;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return false;
            const diff = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
            return diff <= 30;
          }).length
        }
      />

      {loading ? (
        <div className="text-center text-gray-500 py-6">Đang tải...</div>
      ) : (
        <PatientListManage patients={patients} appointments={appointments} />
      )}
    </div>
  );
};

export default PatientList;
