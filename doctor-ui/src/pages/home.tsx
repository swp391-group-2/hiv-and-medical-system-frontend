import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  Bell,
  Plus,
  TrendingUp,
  CheckSquare,
} from "lucide-react";
import {
  getMyDoctorInfo,
  getTodaySchedule,
  getAllAppointmentsByDoctor,
} from "@/api/doctorDashboardAPI";
import { fetchPendingAppointments } from "@/api/doctorPendingAPI";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/types/appointment";
import { DashboardStats } from "@/components/DoctorDashBoard/DashboardStats";
import { TodaySchedule } from "@/components/DoctorDashBoard/TodaySchedule";

interface DoctorInfo {
  fullName: string;
  specialization: string;
  email: string;
}

interface ScheduleSlot {
  id: number;
  status: string;
  slot: {
    startTime: string;
    endTime: string;
    description: string;
  };
}

interface Schedule {
  workDate: string;
  scheduleSlots: ScheduleSlot[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<Schedule[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>(
    []
  );
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedToday: 0,
    pendingToday: 0,
    emergencyToday: 0,
    weeklyTrend: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch all data in parallel
        const [doctorData, scheduleData, appointmentsData, pendingData] =
          await Promise.allSettled([
            getMyDoctorInfo(),
            getTodaySchedule(),
            getAllAppointmentsByDoctor(),
            fetchPendingAppointments(),
          ]);

        // Handle doctor info
        if (doctorData.status === "fulfilled" && doctorData.value) {
          setDoctorInfo(doctorData.value);
        }

        // Handle schedule data
        if (scheduleData.status === "fulfilled" && scheduleData.value) {
          setTodaySchedule(scheduleData.value);
          calculateScheduleStats(scheduleData.value);
        }

        // Handle appointments data
        if (appointmentsData.status === "fulfilled" && appointmentsData.value) {
          const appointments = appointmentsData.value.slice(0, 5); // Get latest 5
          setRecentAppointments(appointments);
          calculateAppointmentStats(appointmentsData.value);
        }

        // Handle pending data
        if (pendingData.status === "fulfilled" && pendingData.value) {
          setPendingAppointments(pendingData.value.slice(0, 3)); // Get top 3 pending
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const calculateScheduleStats = (schedules: Schedule[]) => {
    const totalSlots = schedules.reduce(
      (acc, sch) => acc + sch.scheduleSlots.length,
      0
    );
    const completed = schedules.reduce(
      (acc, sch) =>
        acc + sch.scheduleSlots.filter((s) => s.status === "FINISHED").length,
      0
    );
    const pending = schedules.reduce(
      (acc, sch) =>
        acc + sch.scheduleSlots.filter((s) => s.status === "AVAILABLE").length,
      0
    );
    const emergency = schedules.reduce(
      (acc, sch) =>
        acc +
        sch.scheduleSlots.filter((s) => s.slot?.description?.includes("khẩn"))
          .length,
      0
    );

    setStats((prev) => ({
      ...prev,
      totalAppointments: totalSlots,
      completedToday: completed,
      pendingToday: pending,
      emergencyToday: emergency,
    }));
  };

  const calculateAppointmentStats = (appointments: Appointment[]) => {
    // Calculate weekly trend (mock calculation)
    const thisWeek = appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return aptDate >= weekAgo;
    }).length;

    setStats((prev) => ({
      ...prev,
      weeklyTrend: thisWeek,
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Chào mừng, BS. {doctorInfo?.fullName || "Doctor"}
        </h1>
        <p className="text-gray-600">
          {doctorInfo?.specialization} •{" "}
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <TodaySchedule schedules={todaySchedule} isLoading={isLoading} />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/doctor/pending")}
            >
              <Users className="mr-2 h-4 w-4" />
              Xem bệnh nhân chờ khám
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/doctor/schedule")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Quản lý lịch làm việc
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/doctor/qa")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Trả lời câu hỏi
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/doctor/blogs")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Viết bài blog
            </Button>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Bệnh nhân gần đây
            </CardTitle>
            <CardDescription>Danh sách cuộc hẹn gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentAppointments.length > 0 ? (
                recentAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {appointment.patient?.fullName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(appointment.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {appointment.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">Chưa có cuộc hẹn nào</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              Việc cần làm
            </CardTitle>
            <CardDescription>Các hành động đang chờ xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingAppointments.length > 0 ? (
                pendingAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded"
                  >
                    <p className="font-medium text-sm">
                      {appointment.patient?.fullName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Chờ kết quả xét nghiệm
                    </p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => navigate("/doctor/pending")}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <CheckSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">Không có việc cần làm</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Tóm tắt tuần này
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tổng cuộc hẹn</span>
                <span className="font-bold">{stats.weeklyTrend}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
                <span className="font-bold text-green-600">
                  {stats.totalAppointments > 0
                    ? Math.round(
                        (stats.completedToday / stats.totalAppointments) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      stats.totalAppointments > 0
                        ? (stats.completedToday / stats.totalAppointments) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
