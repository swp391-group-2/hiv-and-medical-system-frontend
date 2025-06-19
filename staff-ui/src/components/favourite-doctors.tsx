import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";

const popularDoctors = [
  { name: "BS. Nguyễn Văn A", appointments: 89 },
  { name: "BS. Trần Thị B", appointments: 76 },
  { name: "BS. Lê Văn C", appointments: 65 },
  { name: "BS. Phạm Thị D", appointments: 54 },
];

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
              <p className="font-medium">{doctor.name}</p>
              <Badge variant="secondary" className="bg-green-400">
                {doctor.appointments} lịch hẹn
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavouriteDoctors;
