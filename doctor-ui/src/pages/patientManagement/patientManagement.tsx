import HeaderStats from "@/components/PatientManagement/headerStats.t";
import PatientList from "@/components/PatientManagement/patientListManage";
import React from "react";
import { patients } from "./patientType";

const patientManagement = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">Quản lý bệnh nhân</h1>
      <p className="text-gray-600 mb-6">
        Thông tin và lịch sử xét nghiệm của bệnh nhân
      </p>

      <HeaderStats totalPatients={3} totalTests={6} testsLast30Days={0} />
      <PatientList patients={patients} />
    </div>
  );
};

export default patientManagement;
