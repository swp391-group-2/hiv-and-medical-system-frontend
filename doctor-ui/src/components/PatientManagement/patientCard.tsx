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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Appointment } from "@/types/appointment";

const PatientCard: React.FC<{ patient: Patient; appointment: Appointment }> = ({
  patient,
  appointment,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("info");

  // Giả sử thông tin phác đồ nằm trong appointment.prescription
  const prescription = (appointment as any).prescription;

  return (
    <>
      <div className="bg-white border rounded-xl p-4 shadow mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{patient.fullName} </h2>
            <div className="text-sm text-gray-600">
              <strong>Mã BN:</strong> {patient.patientId}
            </div>
            <div className="text-sm text-gray-600">
              <strong >Mã buổi khám:</strong>{" "}
              {appointment.appointmentCode || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong> Giới tính:</strong> {patient.gender || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Sinh:</strong>
              {patient.dob || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Giờ khám:</strong> {appointment.startTime || "Không rõ"}
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

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="protocol">Phác đồ</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
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
            </TabsContent>
            <TabsContent value="protocol">
              {prescription ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <b className="text-gray-700">Tên phác đồ:</b>{" "}
                    {prescription.name}
                  </div>
                  <div>
                    <b className="text-gray-700">Mô tả:</b>{" "}
                    {prescription.description || "Không rõ"}
                  </div>
                  <div>
                    <b className="text-gray-700">Chống chỉ định:</b>{" "}
                    {prescription.contraindication || "Không rõ"}
                  </div>
                  <div>
                    <b className="text-gray-700">Hướng dẫn:</b>{" "}
                    {prescription.instructions || "Không rõ"}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  Chưa có phác đồ cho bệnh nhân này.
                </div>
              )}
            </TabsContent>
          </Tabs>

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
