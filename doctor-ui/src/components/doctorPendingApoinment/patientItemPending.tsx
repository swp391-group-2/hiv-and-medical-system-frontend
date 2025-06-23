import React, { useState } from "react";
import type { Appointment } from "@/types/appointment/appointment";
import { useNavigate } from "react-router-dom";
import BasicModal from "../Modal/basicModal";

interface Props {
  appointment: Appointment;
}

const PatientItemPending: React.FC<Props> = ({ appointment }) => {
  const { patient, doctorName, labResult, appointmentCode } = appointment;

  const resultLabel = labResult?.conclusion ?? "Chờ kết quả";
  const resultColor = labResult ? "text-green-600" : "text-gray-600";

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center border rounded p-4 mb-2 hover:bg-gray-50 cursor-pointer">
        <div>
          <div className="font-semibold">{patient.fullName}</div>
          <div className="text-sm text-gray-600">
            Mã lịch hẹn : {appointmentCode}
          </div>
          <div className="text-sm text-gray-600">
            Ngày hẹn : {appointment.date}
          </div>
          <div className="text-sm text-gray-600">Bác sĩ: {doctorName}</div>
          <div className={`text-sm ${resultColor}`}>
            Kết luận: {resultLabel}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-4 py-1 h-10 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Xem chi tiết
          </button>
          <button
            className="px-4 py-1 h-10 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
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

      <BasicModal open={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Chi tiết bệnh nhân
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <b>Họ tên:</b> {patient.fullName}
          </div>
          <div>
            <b>Mã BN:</b> {patient.patientCode || patient.patientId}
          </div>
          <div>
            <b>Email:</b> {patient.email || "Không rõ"}
          </div>
          <div>
            <b>Giới tính:</b> {patient.gender || "Không rõ"}
          </div>
          <div>
            <b>Ngày sinh:</b> {patient.dob || "Không rõ"}
          </div>
          <div>
            <b>Địa chỉ:</b> {patient.address || "Không rõ"}
          </div>
          <div>
            <b>SĐT:</b> {patient.phoneNumber || "Không rõ"}
          </div>
          <div>
            <b>CMND:</b> {patient.identificationCard || "Không rõ"}
          </div>
          <div>
            <b>Bảo hiểm:</b> {patient.healthInsurance || "Không rõ"}
          </div>
          <div>
            <b>Nghề nghiệp:</b> {patient.occupation || "Không rõ"}
          </div>
          <div>
            <b>Trạng thái:</b> {patient.userStatus || "Không rõ"}
          </div>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Đóng
        </button>
      </BasicModal>
    </>
  );
};

export default PatientItemPending;
