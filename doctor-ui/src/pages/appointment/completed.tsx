import PatientListManage from "@/components/PatientManagement/patientListManage";
import React, { useEffect, useState } from "react";
import type { Patient } from "../../types/patientType";
import { fetchCompletedPatients } from "@/api/doctorFetchPatientCompleteAPI";
import HeaderStats from "@/components/PatientManagement/headerStats.t";

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await fetchCompletedPatients();
        setPatients(data);
      } catch (error) {
        console.error("Lỗi khi fetch bệnh nhân:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">Xét nghiệm đã hoàn thành</h1>
      <p className="text-gray-600 mb-6">
        Thông tin và lịch sử xét nghiệm của bệnh nhân
      </p>

      <HeaderStats
        totalPatients={patients.length}
        totalTests={patients.length} // bạn có thể đổi thành logic thật
        testsLast30Days={
          patients.filter((p) => {
            const date = new Date(p.updatedAt || p.createdAt || p.dob);
            const diff = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
            return diff <= 30;
          }).length
        }
      />

      {loading ? (
        <div className="text-center text-gray-500 py-6">Đang tải...</div>
      ) : (
        <PatientListManage patients={patients} />
      )}
    </div>
  );
};

export default PatientList;
