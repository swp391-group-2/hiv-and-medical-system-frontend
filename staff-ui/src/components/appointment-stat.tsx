import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { AppointmentStat } from "@/types/stats";

const AppointmentStatSection = ({ list }: { list: AppointmentStat[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Activity className="h-5 w-5 mr-2" />
          Thống kê dịch vụ khám
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {list.map((item) => (
            <div
              key={item.service}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.service}</span>
                  <span className="text-sm text-gray-500">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentStatSection;
