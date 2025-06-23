import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";
import type { FavoriteDoctor } from "@/types/stats";

const popularDoctors = [
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    specialization: "HIV",
    totalAppointment: 89,
  },
  {
    id: 2,
    name: "BS. Trần Thị B",
    specialization: "HIV",
    totalAppointment: 76,
  },
  { id: 3, name: "BS. Lê Văn C", specialization: "HIV", totalAppointment: 65 },
  {
    id: 4,
    name: "BS. Phạm Thị D",
    specialization: "HIV",
    totalAppointment: 54,
  },
] as FavoriteDoctor[];

const FavouriteDoctors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          Bác sĩ phổ biến
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularDoctors.map((doctor, index) => (
            <div
              // {link to selected doctor profile}
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <div>
                <p className="font-medium">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
              <Badge variant="secondary" className="bg-green-400">
                {doctor.totalAppointment} lịch hẹn
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavouriteDoctors;
