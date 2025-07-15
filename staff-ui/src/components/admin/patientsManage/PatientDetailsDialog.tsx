import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/admin";
import { type Patient, type Appointment } from "@/types/types";
import http from "@/api/http";

interface PatientDetailsDialogProps {
  patient: Patient | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PatientDetailsDialog = ({
  patient,
  isOpen,
  onOpenChange,
}: PatientDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("info");

  // Fetch appointments for the patient
  const {
    data: appointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments", patient?.patientId],
    queryFn: async () => {
      if (!patient?.patientId) return [];
      const { data } = await http.get<{ data: Appointment[] }>(`/appointments`);
      // Filter appointments to only show for the selected patient
      return data.data.filter(
        (appointment) => appointment.patient.patientId === patient.patientId
      );
    },
    enabled: !!patient?.patientId && isOpen,
  });

  if (!patient) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
            Đã lên lịch
          </Badge>
        );
      case "CHECKED_IN":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200">
            Đã check-in
          </Badge>
        );
      case "LAB_COMPLETED":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200">
            Hoàn thành xét nghiệm
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
            Hoàn thành
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết bệnh nhân</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="history">Lịch sử khám bệnh</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6 mt-6">
            {/* Patient Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin cá nhân</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Họ và tên</p>
                  <p className="font-medium">{patient.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày sinh</p>
                  <p className="font-medium">{formatDate(patient.dob)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giới tính</p>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Số điện thoại</p>
                  <p className="font-medium">{patient.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mã bệnh nhân</p>
                  <p className="font-medium">{patient.patientCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CMND/CCCD</p>
                  <p className="font-medium">{patient.identificationCard}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nghề nghiệp</p>
                  <p className="font-medium">{patient.occupation}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Địa chỉ</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bảo hiểm y tế</p>
                  <p className="font-medium">{patient.healthInsurance}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <Badge
                    variant={
                      patient.userStatus === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {patient.userStatus === "ACTIVE"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            {/* Appointments and Medical History */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Lịch sử khám bệnh</h3>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <p className="text-red-500 text-center py-8">
                  Có lỗi xảy ra khi tải thông tin lịch khám
                </p>
              ) : appointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Chưa có lịch khám nào
                </p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.appointmentId}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">
                            Mã lịch hẹn: {appointment.appointmentCode}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(appointment.date)} |{" "}
                            {appointment.startTime} - {appointment.endTime}
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Dịch vụ
                          </p>
                          <p className="font-medium">
                            {appointment.serviceName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Loại dịch vụ
                          </p>
                          <p className="font-medium">
                            {appointment.serviceType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bác sĩ khám
                          </p>
                          <p className="font-medium">
                            {appointment.doctorName || "Chưa phân công"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Giá dịch vụ
                          </p>
                          <p className="font-medium">
                            {appointment.price?.toLocaleString("vi-VN")} VNĐ
                          </p>
                        </div>
                      </div>

                      {appointment.note && (
                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground">
                            Ghi chú
                          </p>
                          <p className="font-medium">{appointment.note}</p>
                        </div>
                      )}

                      {/* Prescription Information */}
                      {appointment.patientPrescription && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-2">
                            Phác đồ điều trị
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="font-medium text-blue-900">
                              Mã phác đồ:{" "}
                              {
                                appointment.patientPrescription
                                  .prescriptionDefaultId
                              }
                            </p>
                            <p className="text-sm text-blue-800">
                              Tên phác đồ:{" "}
                              {
                                appointment.patientPrescription
                                  .prescriptionDefaultName
                              }
                            </p>
                            <p className="text-sm text-blue-800">
                              Thời gian:{" "}
                              {appointment.patientPrescription.duration}
                            </p>
                            {appointment.patientPrescription.note && (
                              <p className="text-sm text-blue-800">
                                Ghi chú: {appointment.patientPrescription.note}
                              </p>
                            )}
                            <p className="text-sm text-blue-800">
                              Ngày tạo:{" "}
                              {formatDate(
                                appointment.patientPrescription.createdAt
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Lab Results */}
                      {appointment.labResult && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-2">
                            Kết quả xét nghiệm
                          </p>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">
                              Trạng thái: {appointment.labResult.resultStatus}
                            </p>
                            {appointment.labResult.resultDate && (
                              <p className="text-sm text-green-800">
                                Ngày có kết quả:{" "}
                                {formatDate(appointment.labResult.resultDate)}
                              </p>
                            )}
                            {appointment.labResult.conclusion && (
                              <p className="text-sm text-green-800">
                                Kết luận: {appointment.labResult.conclusion}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
