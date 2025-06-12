import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface ProfileDoneProps {
  name?: string;
  birthDate?: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  email?: string;
  ethnicity?: string;
}

const ProfileDone = ({
  name = "Nguyễn Hoài Phương",
  birthDate = "15/03/1990",
  phoneNumber = "0912345678",
  address = "123 Đường ABC, Quận 1, TP.HCM",
  gender = "Nam",
  email = "nguyenvanan@email.com",
  ethnicity = "Kinh",
}: ProfileDoneProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType } = useParams<{ serviceType: string }>();
  const handleBack = () => {
    navigate(-1);
  };
  const handleConfirmProfile = () => {
    if (location.pathname.includes("doctors")) {
      navigate(
        `/services/booking-confirm/doctors/${location.pathname
          .split("/")
          .pop()}`
      );
    } else if (serviceType?.includes("screeningtest")) {
      navigate("/services/booking-confirm/screeningtest");
    } else if (serviceType?.includes("confirmatorytest")) {
      navigate("/services/booking-confirm/confirmatorytest");
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
            <h2 className="text-xl font-bold text-primary">{name}</h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Ngày sinh:</span>
              <span className="font-medium">{birthDate}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{phoneNumber}</span>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="font-medium">{address}</span>
            </div>

            <div className="flex items-center space-x-3">
              <UserCheck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Giới tính:</span>
              <span className="font-medium">{gender}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Địa chỉ email:</span>
              <span className="font-medium">{email}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Dân tộc:</span>
              <span className="font-medium">{ethnicity}</span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
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
