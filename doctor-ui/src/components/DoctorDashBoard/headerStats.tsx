import { FC, type JSX } from "react";
import { CalendarDays, User, Clock, AlertTriangle } from "lucide-react";

interface Stat {
  icon: JSX.Element;
  label: string;
  value: number;
  color: string;
}

const stats: Stat[] = [
  { icon: <CalendarDays />, label: "Lịch hẹn hôm nay", value: 8, color: "text-blue-600" },
  { icon: <User />, label: "Đã khám", value: 3, color: "text-green-600" },
  { icon: <Clock />, label: "Chờ khám", value: 5, color: "text-orange-500" },
  { icon: <AlertTriangle />, label: "Khẩn cấp", value: 2, color: "text-red-600" },
];

const HeaderStats: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center p-4 bg-white rounded-xl shadow-sm">
          <div className={`text-xl mr-3 ${stat.color}`}>{stat.icon}</div>
          <div>
            <div className="text-xl font-semibold">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeaderStats;
