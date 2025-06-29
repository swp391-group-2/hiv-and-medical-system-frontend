import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { buildRoute } from "@/constants/appRoutes";

export interface DoctorCardProps {
  doctorId: string;
  email: string;
  fullName: string;
  urlImage?: string;
  rating?: number;
}

const DoctorCard = ({
  doctorId,
  email,
  fullName,
  urlImage,
  rating = 5,
}: DoctorCardProps) => {
  const navigation = useNavigate();

  const handleBooking = (doctorId: string) => {
    navigation(buildRoute.bookingConsultationDoctor(doctorId));
  };
  return (
    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md  ">
      <CardContent className="p-4">
        <div className="flex justify-center mb-3 ">
          <div className="relative w-full">
            <div className="w-full h-50 rounded-lg overflow-hidden bg-gray-100">
              {urlImage ? (
                <img
                  src={urlImage}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl font-semibold">
                  {fullName}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-md  mb-1 text-gray-800 group-hover:text-primary transition-colors">
          Dr. {fullName}
        </h3>

        <p className="text-sm text-gray-600 mb-2">{email}</p>

        {/* Rating */}
        <div className="flex items-center  mb-4">
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-800">{rating || 5}</span>
            <span className="text-gray-500 text-sm ml-1">(120+ đánh giá)</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>8:00 - 17:00</span>
          </div>
        </div>

        {/* Booking Button */}

        <Button
          onClick={() => handleBooking(doctorId)}
          className="w-full   text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span className="flex items-center justify-center">
            Đặt lịch khám
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
