import React, { useState } from "react";
import PatientItemPending from "./patientItemPending";
import type { Appointment } from "@/types/appointment/appointment";

interface Props {
  appointments: Appointment[];
  loading?: boolean;
}

const PatientListPending: React.FC<Props> = ({ appointments, loading }) => {
  const [search, setSearch] = useState("");

  // Lọc danh sách theo tên hoặc mã BN
  const filtered = appointments.filter(
    (app) =>
      app.patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (app.patient.patientCode &&
        app.patient.patientCode.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white border rounded p-4">
      <h2 className="font-bold text-lg mb-4">
        Danh sách chờ khám ({filtered.length})
      </h2>
      <input
        type="text"
        placeholder="Tìm kiếm tên, mã BN..."
        className="w-full border rounded px-3 py-2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Đang tải dữ liệu...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Không có bệnh nhân nào.
        </div>
      ) : (
        filtered.map((app) => (
          <PatientItemPending key={app.appointmentId} appointment={app} />
        ))
      )}
    </div>
  );
};

export default PatientListPending;
