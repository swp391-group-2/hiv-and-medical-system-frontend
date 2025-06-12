import React, { useState } from "react";
import PatientDialog from "./patientDialogA";

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
  appointment: Appointment;
}

const PatientItemPending: React.FC<Props> = ({ appointment }) => {
  const { patient,  doctorName, labResult } = appointment;

  const resultLabel = labResult?.conclusion ?? "Chờ kết quả";
  const resultColor = labResult ? "text-green-600" : "text-gray-600";

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="flex justify-between items-center border rounded p-4 mb-2 hover:bg-gray-50 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div>
          <div className="font-semibold">{patient.fullName}</div>
          <div className="text-sm text-gray-600">
            Mã BN: {patient.patientCode}
          </div>
          <div className="text-sm text-gray-600">Bác sĩ: {doctorName}</div>
          <div className={`text-sm ${resultColor}`}>
            Kết luận: {resultLabel}
          </div>
        </div>
        <div className="text-blue-600 hover:underline">
          <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
            Khám
          </button>
        </div>
      </div>

      {openDialog && (
        <PatientDialog
          appointment={appointment}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default PatientItemPending;
