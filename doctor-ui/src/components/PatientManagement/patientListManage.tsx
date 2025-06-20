import type { Patient } from "@/types/patientType";
import React, { useState, useMemo } from "react";
import FilterBar from "./filterBar";
import PatientCard from "./patientCard";
import type { Appointment } from "@/types/appointment";

interface Props {
  patients: Patient[];
  appointments: Appointment[];

}

const PatientListManage: React.FC<Props> = ({  appointments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredData = useMemo(() => {
    // map từ số slot => giờ bắt đầu
    const slotStartTimes: Record<string, string> = {
      "1": "07:00:00",
      "2": "08:00:00",
      "3": "09:00:00",
      "4": "10:00:00",
      "5": "13:00:00",
      "6": "14:00:00",
      "7": "15:00:00",
      "8": "16:00:00",
    };

    let filteredAppointments = appointments;

    if (filterType === "byName") {
      filteredAppointments = appointments.filter((a) =>
        a.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === "byDate") {
      filteredAppointments = appointments.filter((a) =>
        a.date.startsWith(searchTerm)
      );
    }

    if (filterType === "bySlot") {
      const targetStartTime = slotStartTimes[searchTerm];
      if (!targetStartTime) return [];
      filteredAppointments = appointments.filter(
        (a) => a.startTime === targetStartTime
      );
    }

    // Trả về mảng các cặp patient và appointment
    return filteredAppointments.map((a) => ({
      patient: a.patient,
      appointment: a,
      patientPrescription : a.patientPrescription,
    }));
  }, [appointments, searchTerm, filterType]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        Quản lý bệnh nhân ({filteredData.length})
      </h2>
      <FilterBar
        searchTerm={searchTerm}
        filterType={filterType}
        onSearchChange={setSearchTerm}
        onFilterTypeChange={setFilterType}
      />
      {filteredData.length === 0 ? (
        <p className="text-gray-500">Không tìm thấy bệnh nhân.</p>
      ) : (
        filteredData.map(({ patient, appointment, }) => (
          <PatientCard
            key={`${patient.patientId}-${appointment.appointmentId}`}
            patient={patient}
            appointment={appointment}
           
          />
        ))
      )}
    </div>
  );
};

export default PatientListManage;
