import React from "react";
import { Calendar, Clock, User, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  gradient,
}) => {
  return (
    <Card
      className={`${gradient} text-white border-0 overflow-hidden relative`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              {icon}
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              {subtitle && (
                <p className="text-white/70 text-xs mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {trend && (
            <div
              className={`text-right ${
                trend.isPositive ? "text-green-200" : "text-red-200"
              }`}
            >
              <div className="text-lg font-semibold">
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </div>
              <div className="text-xs opacity-75">vs tuần trước</div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/5 rounded-full"></div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats: React.FC<{
  stats: {
    totalAppointments: number;
    completedToday: number;
    pendingToday: number;
    emergencyToday: number;
  };
}> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Calendar className="h-6 w-6" />}
        title="Lịch hẹn hôm nay"
        value={stats.totalAppointments}
        subtitle="Tổng số cuộc hẹn"
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        trend={{ value: 12, isPositive: true }}
      />

      <StatsCard
        icon={<User className="h-6 w-6" />}
        title="Đã hoàn thành"
        value={stats.completedToday}
        subtitle="Bệnh nhân đã khám"
        gradient="bg-gradient-to-br from-green-500 to-green-600"
        trend={{ value: 8, isPositive: true }}
      />

      <StatsCard
        icon={<Clock className="h-6 w-6" />}
        title="Chờ khám"
        value={stats.pendingToday}
        subtitle="Đang chờ xử lý"
        gradient="bg-gradient-to-br from-orange-500 to-orange-600"
      />

      <StatsCard
        icon={<AlertTriangle className="h-6 w-6" />}
        title="Khẩn cấp"
        value={stats.emergencyToday}
        subtitle="Cần xử lý ngay"
        gradient="bg-gradient-to-br from-red-500 to-red-600"
        trend={{ value: -5, isPositive: false }}
      />
    </div>
  );
};
