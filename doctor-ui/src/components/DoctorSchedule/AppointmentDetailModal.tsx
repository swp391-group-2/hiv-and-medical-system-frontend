import React from "react";
import { User, Clock, MapPin, Phone, FileText, DollarSign } from "lucide-react";
import type { ScheduleAppointment } from "@/types/schedule/weeklySchedule";
import BasicModal from "@/components/Modal/basicModal";

interface AppointmentDetailModalProps {
  appointment: ScheduleAppointment | null;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
  appointment,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !appointment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "WAITING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "LAB_COMPLETED":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Hoàn thành";
      case "IN_PROGRESS":
        return "Đang khám";
      case "WAITING":
        return "Chờ khám";
      case "LAB_COMPLETED":
        return "Xét nghiệm hoàn thành";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Chi tiết cuộc hẹn</h2>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Mã cuộc hẹn
            </label>
            <p className="text-lg font-semibold">
              {appointment.appointmentCode}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Trạng thái
            </label>
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                appointment.status
              )}`}
            >
              {getStatusText(appointment.status)}
            </div>
          </div>
        </div>

        {/* Thời gian */}
        <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
          <Clock className="text-blue-600" size={20} />
          <div>
            <p className="font-medium">Thời gian khám</p>
            <p className="text-gray-600">
              {appointment.date} | {appointment.startTime} -{" "}
              {appointment.endTime}
            </p>
          </div>
        </div>

        {/* Thông tin bệnh nhân */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="text-gray-600" size={20} />
            <h3 className="font-semibold">Thông tin bệnh nhân</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Họ và tên
              </label>
              <p className="font-medium">{appointment.patient.fullName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p>{appointment.patient.email}</p>
            </div>
            {appointment.patient.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Số điện thoại
                  </label>
                  <p>{appointment.patient.phone}</p>
                </div>
              </div>
            )}
            {appointment.patient.address && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-600" />
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Địa chỉ
                  </label>
                  <p>{appointment.patient.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thông tin dịch vụ */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Thông tin dịch vụ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Tên dịch vụ
              </label>
              <p className="font-medium">{appointment.serviceName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Loại dịch vụ
              </label>
              <p>{appointment.serviceType}</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-gray-600" />
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Chi phí
                </label>
                <p className="font-medium text-green-600">
                  {formatCurrency(appointment.price)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mô tả slot */}
        {appointment.slotDescription && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-gray-600" size={20} />
              <h3 className="font-semibold">Mô tả slot</h3>
            </div>
            <p className="text-gray-700">{appointment.slotDescription}</p>
          </div>
        )}

        {/* Ghi chú */}
        {appointment.note && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-gray-600" size={20} />
              <h3 className="font-semibold">Ghi chú</h3>
            </div>
            <p className="text-gray-700">{appointment.note}</p>
          </div>
        )}

        {/* Thông tin xét nghiệm (nếu có) */}
        {/* {appointment.labResult && (
            <div className="border rounded-lg p-4 bg-purple-50">
              <h3 className="font-semibold mb-3 text-purple-800">
                Kết quả xét nghiệm
              </h3>
              <div className="text-sm text-purple-700">
                <p>Có kết quả xét nghiệm - Xem chi tiết trong hệ thống</p>
              </div>
            </div>
          )} */}
      </div>
    </BasicModal>
  );
};

export default AppointmentDetailModal;
