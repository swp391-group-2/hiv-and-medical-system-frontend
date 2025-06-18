import type { Appointment } from "@/types/appointment/appointment";
import React from "react";
// import PatientDialog from "./patientDialogA";
import { useNavigate } from "react-router-dom";

interface Props {
  appointment: Appointment;
}

const PatientItemPending: React.FC<Props> = ({ appointment }) => {
  const { patient, doctorName, labResult, appointmentCode} = appointment;

  const resultLabel = labResult?.conclusion ?? "Chờ kết quả";
  const resultColor = labResult ? "text-green-600" : "text-gray-600";

  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center border rounded p-4 mb-2 hover:bg-gray-50 cursor-pointer">
        <div>
          <div className="font-semibold">{patient.fullName}</div>
          <div className="text-sm text-gray-600">
            Mã BN: {patient.patientCode}
          </div>
           <div className="text-sm text-gray-600">
           appointmentCode : {appointmentCode}
          </div>
          <div className="text-sm text-gray-600">Bác sĩ: {doctorName}</div>
          <div className={`text-sm ${resultColor}`}>
            Kết luận: {resultLabel}
          </div>
        </div>
        <div className="text-blue-600 hover:underline">
          <button
            className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/doctor/arv-seclect", {
                state: {
                  patient,
                  labResult,
                  appointmentId: appointment.appointmentId,
                },
              });
            }}
          >
            Khám
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientItemPending;
