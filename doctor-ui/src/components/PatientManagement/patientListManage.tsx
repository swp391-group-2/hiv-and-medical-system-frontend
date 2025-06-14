import type { Patient } from "@/types/patientType";
import React from "react";
import FilterBar from "./filterBar";
import PatientCard from "./patientCard";

interface Props {
  patients: Patient[];
}

const PatientListManage: React.FC<Props> = ({ patients }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        Quản lý bệnh nhân ({patients.length})
      </h2>
      <FilterBar />
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
};

export default PatientListManage;
