import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";
import { useFavoriteDoctors } from "@/api/stats";
import { options } from "./manager/specialization-select";

const FavouriteDoctors = () => {
  const { data: topDoctors = [] } = useFavoriteDoctors(5);
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
          {topDoctors.map((doctor, index) => {
            // Check if doctor exists before accessing its properties
            if (!doctor) {
              return null;
            }

            const displayName =
              options.find((opt) => opt.id === doctor.specialization)
                ?.name ?? doctor.specialization;
            return (
              <div
                // {link to selected doctor profile}
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{doctor.fullName}</p>
                  <p className="text-sm text-gray-600">{displayName}</p>
                </div>
                <Badge variant="secondary" className="bg-green-400">
                  {doctor.totalAppointment} lịch hẹn
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
