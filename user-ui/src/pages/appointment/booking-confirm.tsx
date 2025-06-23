import {
  User,
  Calendar,
  Mail,
  CreditCard,
  MapPin,
  Building,
  AlertCircleIcon,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useBookingStore from "@/stores/booking.store";
import type { AppointmentBooking } from "@/apis/appointment.api";
import appointmentApi from "@/apis/appointment.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "@/constants/appRoutes";
import { useEffect } from "react";

const BookingConfirm = () => {
  const navigate = useNavigate();
  const user = useBookingStore((state) => state.user);
  const doctor = useBookingStore((state) => state.doctor);
  const service = useBookingStore((state) => state.service);
  const scheduleSlot = useBookingStore((state) => state.scheduleSlot);
  const labTestSlot = useBookingStore((state) => state.labTestSlot);
  // const reset = useBookingStore((state) => state.reset);

  const bookingMutation = useMutation({
    mutationFn: async (appointmentBookingData: AppointmentBooking) => {
      const response = await appointmentApi.postAppointmentBooking(
        appointmentBookingData
      );
      return response;
    },
    onSuccess: (data) => {
      window.location.replace(data.data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleConfirmBooking = () => {
    if (!user || !service) {
      navigate(AppRoutes.HOME);
      return;
    }

    const bookingData: AppointmentBooking = {
      patientId: user.patientId,
      serviceId: service.id,
      scheduleSlotId: scheduleSlot?.id || null,
      labTestSlotId: labTestSlot?.id || null,
    };
    bookingMutation.mutate(bookingData);
  };

  const { doctorId, serviceType } = useParams<{
    doctorId: string;
    serviceType: string;
  }>();
  useEffect(() => {
    console.log("hello");
    if (!service || (!scheduleSlot && !labTestSlot)) {
      if (doctorId) {
        navigate(AppRoutes.HOME);
      } else if (serviceType) {
        navigate(AppRoutes.HOME);
      }
    }
  }, []);

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5 text-white rounded-t-lg">
                <CardTitle className="text-xl ">Thông tin cơ sở y tế</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Building className="w-6 h-6 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Trung tâm điều trị Aura HIV
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Dịch vụ xét nghiệm và điều trị HIV tại Trung tâm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6 py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5 text-white rounded-t-lg">
                <CardTitle className="text-xl">
                  Xác nhận thông tin khám
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="text-gray-700">#</TableHead>
                        <TableHead className="text-gray-700">Dịch Vụ</TableHead>
                        {doctor && (
                          <TableHead className="text-gray-700">
                            Bác Sĩ
                          </TableHead>
                        )}
                        <TableHead className="text-gray-700">
                          Thời gian khám
                        </TableHead>
                        <TableHead className="text-gray-700">
                          Tiền khám
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>{service?.name}</TableCell>
                        {doctor && <TableCell>{doctor.fullName}</TableCell>}
                        {scheduleSlot && (
                          <TableCell>
                            <div>
                              {scheduleSlot.slot.startTime +
                                " " +
                                scheduleSlot.slot.endTime}
                            </div>
                            <div className="text-gray-500">2025-06-16</div>
                          </TableCell>
                        )}
                        {labTestSlot && (
                          <TableCell>
                            <div>
                              {labTestSlot.slot.startTime +
                                " " +
                                labTestSlot.slot.endTime}
                            </div>
                            <div className="text-gray-500">
                              {labTestSlot.date}
                            </div>
                          </TableCell>
                        )}
                        <TableCell>{service?.price} đ</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5  text-white rounded-t-lg">
                <CardTitle className="text-xl">Thông tin bệnh nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Họ và tên:</span>
                        <span className="ml-2 font-medium">
                          {user?.fullName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Ngày sinh:</span>
                        <span className="ml-2 font-medium">{user?.dob}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{user?.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Mã số BHYT:</span>
                        <span className="ml-2 font-medium">
                          {user?.healthInsurance
                            ? user.healthInsurance
                            : "Chưa cập nhật"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Giới tính:</span>
                        <span className="ml-2 font-medium">{user?.gender}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">CMND:</span>
                        <span className="ml-2 font-medium">
                          {user?.identificationCard}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Nghề Nghiệp:</span>
                        <span className="ml-2 font-medium">
                          {user?.occupation}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="ml-2 font-medium">
                          {user?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert
                  variant="destructive"
                  className="mt-6 border-red-200 bg-red-50"
                >
                  <AlertCircleIcon />
                  <AlertDescription>
                    Trong thời gian quy định, nếu quý khách hủy phiếu khám sẽ
                    được hoàn lại tiền khám và các dịch vụ đặt thêm (không bao
                    gồm phí tiện ích).
                  </AlertDescription>
                </Alert>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleConfirmBooking}
                    className="  px-8 py-3"
                  >
                    Xác nhận
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              className="mt-2.5 flex items-center text-lg"
            >
              <Undo2 className="mr-2" />
              Quay Lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirm;
