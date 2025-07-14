import React from "react";
import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface TodayScheduleProps {
  schedules: Schedule[];
  isLoading?: boolean;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "FINISHED":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "AVAILABLE":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "IN_PROGRESS":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "FINISHED":
      return "bg-green-100 text-green-800 border-green-200";
    case "AVAILABLE":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "IN_PROGRESS":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "Có thể đặt lịch";
    case "UNAVAILABLE":
      return "Đã có lịch hẹn";
    case "BLOCKED":
      return "Đã bị khóa";
    case "EXPIRED":
      return "Đã hết hạn";
    case "CHECKED_IN":
      return "Bệnh nhân đã đến";
    case "EXPIRED_NO_CHECKED_IN":
      return "Bệnh nhân vắng mặt";
    default:
      return "Không xác định";
  }
};

const formatTime = (timeString: string) => {
  return timeString.substring(0, 5); // Extract HH:MM from HH:MM:SS
};

export const TodaySchedule: React.FC<TodayScheduleProps> = ({
  schedules,
  isLoading = false,
}) => {
  const allSlots = schedules.flatMap((schedule) =>
    schedule.scheduleSlots.map((slot) => ({
      ...slot,
      date: schedule.workDate,
    }))
  );

  // Sort slots by time
  const sortedSlots = allSlots.sort((a, b) =>
    a.slot.startTime.localeCompare(b.slot.startTime)
  );

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Lịch làm việc hôm nay</CardTitle>
          </div>
          <CardDescription>
            Danh sách các slot khám bệnh trong ngày
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg animate-pulse"
                >
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <CardTitle>Lịch làm việc hôm nay</CardTitle>
        </div>
        <CardDescription>
          {sortedSlots.length > 0
            ? `${sortedSlots.length} slot khám bệnh trong ngày`
            : "Không có lịch làm việc hôm nay"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 overflow-y-auto">
          {sortedSlots.length > 0 ? (
            <div className="space-y-3">
              {sortedSlots.map((slot, index) => (
                <div
                  key={`${slot.date}-${index}`}
                  className="relative flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Timeline connector */}
                  {index < sortedSlots.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-6 bg-gray-200"></div>
                  )}

                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {getStatusIcon(slot.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatTime(slot.slot.startTime)} -{" "}
                          {formatTime(slot.slot.endTime)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {slot.slot.description || "Khám bệnh"}
                        </p>
                      </div>
                      <Badge
                        className={getStatusColor(slot.status)}
                        variant="outline"
                      >
                        {getStatusText(slot.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Calendar className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Không có lịch làm việc</p>
              <p className="text-sm">Hôm nay bạn không có cuộc hẹn nào</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
