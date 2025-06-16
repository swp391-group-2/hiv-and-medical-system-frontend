import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppRoutes, buildRoute } from "@/constants/appRoutes";
import type { UserProfileValues } from "@/types/userProfile.type";
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Users,
  Mail,
  UserCheck,
  Edit,
  ArrowRight,
  Undo2,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface UserProfileProps {
  patientData: UserProfileValues;
}

const ProfileDone = ({ patientData }: UserProfileProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType, doctorId } = useParams<{
    serviceType: string;
    doctorId: string;
  }>();
  const handleBack = () => {
    navigate(-1);
  };
  const handleEditProfile = () => {
    navigate(AppRoutes.USER_PROFILE, { state: { path: location.pathname } });
  };
  const handleConfirmProfile = () => {
    if (doctorId) {
      navigate(buildRoute.bookingConfirmConsultation(doctorId));
    } else if (serviceType) {
      navigate(buildRoute.bookingConfirm(serviceType));
    }
  };
  return (
    <div>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-primary">
              {patientData.fullName}
            </h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Ngày sinh:</span>
              <span className="font-medium">{patientData.dob}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{patientData.phoneNumber}</span>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="font-medium">{patientData.address}</span>
            </div>

            <div className="flex items-center space-x-3">
              <UserCheck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Giới tính:</span>
              <span className="font-medium">
                {patientData.gender === "male"
                  ? "Nam"
                  : patientData.gender === "female"
                  ? "Nữ"
                  : "Không xác định"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Địa chỉ email:</span>
              <span className="font-medium">{patientData.email}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">CCCD:</span>
              <span className="font-medium">
                {patientData.identificationCard}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleEditProfile}
              variant="outline"
              className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Sửa
            </Button>

            <Button
              onClick={handleConfirmProfile}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600"
            >
              Tiếp tục
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={handleBack}
        variant="ghost"
        className="mt-2.5 flex items-center text-lg"
      >
        <Undo2 className="mr-2" />
        Quay Lại
      </Button>
    </div>
  );
};

export default ProfileDone;
