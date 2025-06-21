import React, { useState } from "react";
import { NotebookTabs } from "lucide-react";
import type { Patient } from "@/types/patientType";
import type { Appointment } from "@/types/appointment";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicModal from "@/components/Modal/basicModal";

const PatientCard: React.FC<{ patient: Patient; appointment: Appointment }> = ({
  patient,
  appointment,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("info");
  // Lấy phác đồ điều trị từ appointment
  const prescription = appointment.patientPrescription;

  return (
    <>
      <div className="bg-white border rounded-xl p-4 shadow mb-3 hover:shadow-md transition">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg text-blue-800">
              {patient.fullName}
            </h2>
            <div className="text-sm text-gray-600">
              <strong>Mã BN:</strong> {patient.patientId}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Mã buổi khám:</strong>{" "}
              {appointment.appointmentCode || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Giới tính:</strong> {patient.gender || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Ngày sinh:</strong> {patient.dob || "Không rõ"}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Giờ khám:</strong> {appointment.startTime || "Không rõ"}
            </div>
          </div>

          <button
            className="bg-gray-100 text-gray-800 rounded-full px-3 py-2 hover:bg-gray-200 flex items-center gap-2 transition"
            onClick={() => setShowModal(true)}
          >
            <NotebookTabs className="w-4 h-4" />
            Xem chi tiết
          </button>
        </div>
      </div>

      <BasicModal open={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold text-blue-700 mb-1">
          Chi tiết bệnh nhân
        </h2>
        <p className="text-gray-600 mb-6">
          Thông tin chi tiết về bệnh nhân{" "}
          <span className="font-semibold text-gray-800">
            {patient.fullName}
          </span>
        </p>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4 border rounded-lg p-1 bg-gray-50">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-4 py-2 rounded-md transition"
            >
              Thông tin
            </TabsTrigger>
            <TabsTrigger
              value="protocol"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-4 py-2 rounded-md transition"
            >
              Phác đồ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <b>Họ tên:</b> {patient.fullName}
              </div>
              <div>
                <b>Mã BN:</b> {patient.patientId}
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
          </TabsContent>

          <TabsContent value="protocol">
            {prescription ? (
              <div className="space-y-6 text-sm text-gray-800">
                {/* Tên phác đồ */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-blue-700 mb-1">
                    Tên phác đồ
                  </h3>
                  <p>{prescription.prescriptionDefaultName || "Không rõ"}</p>
                </div>

                {/* Thời gian điều trị */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-blue-700 mb-1">
                    Thời gian điều trị
                  </h3>
                  <p>{prescription.duration || "Không rõ"} ngày</p>
                </div>

                {/* Danh sách thuốc */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-blue-700 mb-3">
                    Chi tiết thuốc
                  </h3>
                  <ul className="space-y-2">
                    {prescription.patientPrescriptionItems?.map(
                      (item: any, idx: number) => (
                        <li
                          key={item.id ?? idx}
                          className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
                        >
                          <div className="font-medium">
                            {item.medication?.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                            {item.dosage}, {item.frequency} –{" "}
                            <span className="font-semibold text-gray-700">
                              SL: {item.quantity}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* note */}
                {/* <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-blue-700 mb-1">Ghi chú</h3>
        <p>{prescription.note || "Không có"}</p>
      </div> */}
              </div>
            ) : (
              <div className="text-gray-500 italic text-sm">
                Chưa có phác đồ cho bệnh nhân này.
              </div>
            )}
          </TabsContent>
        </Tabs>

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

export default PatientCard;
