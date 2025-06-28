import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";
import { useFavoriteDoctors } from "@/api/stats";
import { options } from "./manager/specialization-select";

const FavouriteDoctors = () => {
  const { data: topDoctors = [] } = useFavoriteDoctors(0, 4);
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
          {topDoctors.map((item, index) => {
            const displayName =
              options.find((opt) => opt.id === item.doctor.specialization)
                ?.name ?? item.doctor.specialization;
            return (
              <div
                // {link to selected doctor profile}
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{item.doctor.fullName}</p>
                  <p className="text-sm text-gray-600">{displayName}</p>
                </div>
                <Badge variant="secondary" className="bg-green-400">
                  {item.totalAppointment} lịch hẹn
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavouriteDoctors;
