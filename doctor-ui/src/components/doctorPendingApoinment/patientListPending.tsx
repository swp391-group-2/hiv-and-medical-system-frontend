import React from "react";
import PatientItemPending from "./patientItemPending";

interface Appointment {
  appointmentId: number;
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
    viralLoad?: string;
    cd4?: string;
  };
}

interface Props {
  appointments: Appointment[];
  loading?: boolean;
}

const PatientListPending: React.FC<Props> = ({ appointments, loading }) => {
  return (
    <div className="bg-white border rounded p-4">
      <h2 className="font-bold text-lg mb-4">
        Danh sách chờ khám ({appointments.length})
      </h2>
      <input
        type="text"
        placeholder="Tìm kiếm tên, mã BN..."
        className="w-full border rounded px-3 py-2 mb-4"
      />
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Đang tải dữ liệu...
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Không có bệnh nhân nào.
        </div>
      ) : (
        appointments.map((app) => (
          <PatientItemPending key={app.appointmentId} appointment={app} />
        ))
      )}
    </div>
  );
};

export default PatientListPending;
