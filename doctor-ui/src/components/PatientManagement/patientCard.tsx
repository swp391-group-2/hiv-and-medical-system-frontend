import React, { useState } from "react";
import { Eye } from "lucide-react";
import type { Patient } from "@/types/patientType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import type { Appointment } from "@/types/appointment";

const PatientCard: React.FC<{ patient: Patient; appointment: Appointment }> = ({
  patient,
  appointment,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white border rounded-xl p-4 shadow mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{patient.fullName} </h2>
            <div className="text-sm text-gray-600">
              Mã BN: {patient.patientId}
            </div>
            <div className="text-sm text-gray-600">
              Giới tính: {patient.gender || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              Sinh: {patient.dob || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              Giờ khám: {appointment.startTime || "Không rõ"}
            </div>
          </div>
          <button
            className="bg-gray-100 text-gray-800 rounded-full p-2 hover:bg-gray-200 flex"
            onClick={() => setShowModal(true)}
          >
            <Eye className="w-4 h-4 mr-1" /> xem chi tiết
          </button>
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl p-6 rounded-xl shadow-lg border bg-white">
          <DialogHeader className="border-b pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-blue-700">
                  Chi tiết bệnh nhân
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Thông tin chi tiết về bệnh nhân <b>{patient.fullName}</b>
                </DialogDescription>
              </div>
              <DialogClose asChild></DialogClose>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <b className="text-gray-700">Họ tên:</b> {patient.fullName}
            </div>
            <div>
              <b className="text-gray-700">Mã BN:</b> {patient.patientId}
            </div>
            <div>
              <b className="text-gray-700">Email:</b>{" "}
              {patient.email || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Giới tính:</b>{" "}
              {patient.gender || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Ngày sinh:</b>{" "}
              {patient.dob || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Địa chỉ:</b>{" "}
              {patient.address || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">SĐT:</b>{" "}
              {patient.phoneNumber || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">CMND:</b>{" "}
              {patient.identificationCard || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Bảo hiểm:</b>{" "}
              {patient.healthInsurance || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Nghề nghiệp:</b>{" "}
              {patient.occupation || "Không rõ"}
            </div>
            <div>
              <b className="text-gray-700">Trạng thái:</b>{" "}
              {patient.userStatus || "Không rõ"}
            </div>
          </div>

          <DialogClose asChild>
            <button className="mt-6 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Đóng
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientCard;
