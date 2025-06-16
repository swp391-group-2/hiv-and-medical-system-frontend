import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  CreditCard,
  IdCard,
  Briefcase,
} from "lucide-react";
import { type UserProfileValues } from "@/types/userProfile.type";

interface AppointmentData {
  date: Date;
  time: string;
  profile: UserProfileValues;
}

interface AppointmentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentData | null;
}

const AppointmentConfirmation = ({
  isOpen,
  onClose,
  appointment,
}: AppointmentConfirmationProps) => {
  const handleConfirm = () => {
    onClose();
  };

  if (!appointment) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Xác nhận đặt lịch khám
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium text-gray-800 mb-3">
              Thông tin lịch khám
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Trung tâm xét nghiệm y khoa Tass Care
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {formatDate(appointment.date)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {appointment.time}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium text-gray-800 mb-3">
              Thông tin bệnh nhân
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {appointment.profile.fullName}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({appointment.profile.gender})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    SĐT: {appointment.profile.phoneNumber}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Ngày sinh: {appointment.profile.dob}
                </div>

                {appointment.profile.identificationCard && (
                  <div className="flex items-center space-x-2">
                    <IdCard className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      CCCD/CMND: {appointment.profile.identificationCard}
                    </span>
                  </div>
                )}

                {appointment.profile.healthInsurance && (
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Số BHYT: {appointment.profile.healthInsurance}
                    </span>
                  </div>
                )}

                {appointment.profile.occupation && (
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Nghề nghiệp: {appointment.profile.occupation}
                    </span>
                  </div>
                )}

                <div className="md:col-span-2">
                  <span className="text-sm text-gray-600">
                    Địa chỉ: {appointment.profile.address}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex space-x-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Quay lại
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600"
            >
              Xác nhận đặt lịch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
