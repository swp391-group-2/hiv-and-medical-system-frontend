import { FC, useEffect, useState, type JSX } from "react";
import { CalendarDays, User, Clock, AlertTriangle } from "lucide-react";
import { getTodaySchedule } from "@/api/doctorDashboardAPI";

interface Stat {
  icon: JSX.Element;
  label: string;
  value: number;
  color: string;
}

const HeaderStats: FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const schedules = await getTodaySchedule();

        const total = schedules.reduce((acc, sch) => acc + sch.scheduleSlots.length, 0);
        const completed = schedules.reduce(
          (acc, sch) =>
            acc + sch.scheduleSlots.filter((s: any) => s.status === "FINISHED").length,
          0
        );
        const waiting = schedules.reduce(
          (acc, sch) =>
            acc + sch.scheduleSlots.filter((s: any) => s.status === "AVAILABLE").length,
          0
        );
        const emergency = schedules.reduce(
          (acc, sch) =>
            acc + sch.scheduleSlots.filter((s: any) => s.slot?.description?.includes("khẩn")).length,
          0
        );

        setStats([
          { icon: <CalendarDays />, label: "Lịch hẹn hôm nay", value: total, color: "text-blue-600" },
          { icon: <User />, label: "Đã khám", value: completed, color: "text-green-600" },
          { icon: <Clock />, label: "Chờ khám", value: waiting, color: "text-orange-500" },
          { icon: <AlertTriangle />, label: "Khẩn cấp", value: emergency, color: "text-red-600" },
        ]);
      } catch (err) {
        console.error("Lỗi load thống kê:", err);
      }
    };

    fetchStats();
  }, []);

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
