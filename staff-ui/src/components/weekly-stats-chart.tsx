import { useState } from "react";
import { useWeeklyStats } from "@/api/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LoadingOverlay } from "./loading-overlay";
import { toast } from "sonner";

// Định nghĩa các khoảng thời gian 2 tháng
const TIME_PERIODS = [
  {
    label: "01/25 - 02/25",
    value: "2025-01-02025-02",
    startDate: "2025-01-01",
    endDate: "2025-02-28",
  },
  {
    label: "03/25 - 04/25",
    value: "2025-03-2025-04",
    startDate: "2025-03-01",
    endDate: "2025-04-30",
  },
  {
    label: "05/25 - 06/25",
    value: "2025-05-2025-06",
    startDate: "2025-05-01",
    endDate: "2025-06-30",
  },
  {
    label: "07/25 - 08/25",
    value: "2025-07-2025-08",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
  },
  {
    label: "09/25 - 10/25",
    value: "2025-09-2025-10",
    startDate: "2025-09-01",
    endDate: "2025-10-31",
  },
  {
    label: "11/25 - 12/25",
    value: "2025-11-2025-12",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
  },
  {
    label: "06/25 - 07/25",
    value: "2025-06-2025-07",
    startDate: "2025-06-01",
    endDate: "2025-07-31",
  },
  {
    label: "08/25 - 09/25",
    value: "2025-08-2025-09",
    startDate: "2025-08-01",
    endDate: "2025-09-30",
  },
];

export const WeeklyStatsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS[4]); // Default to 05/25 - 06/25
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    "Tổng khách hàng": true,
    "Bác sĩ hoạt động": true,
    "Tổng lịch hẹn": true,
    "Doanh thu tháng": true,
  });

  const {
    data: weeklyStats = [],
    isLoading,
    isError,
    error,
  } = useWeeklyStats(selectedPeriod.startDate, selectedPeriod.endDate);

  if (isError) {
    console.log(error.message);
    toast.error("Đã xảy ra lỗi khi tải dữ liệu biểu đồ.");
  }

  // Transform data cho Recharts
  const chartData = weeklyStats.map((week, index) => {
    const weekData: Record<string, string | number | boolean> = {
      week: `Tuần ${index + 1}`,
      weekRange: week.weekRange,
    };

    // Add các stats vào weekData - sử dụng change (phần trăm tăng trưởng)
    week.stats.forEach((stat) => {
      // Parse change value (remove % and convert to number)
      const changeValue =
        parseFloat(stat.change.replace("%", "").replace(/[^\d.-]/g, "")) || 0;
      weekData[stat.title] = changeValue;

      // Store additional info for tooltip
      weekData[`${stat.title}_value`] = stat.value;
      weekData[`${stat.title}_growing`] = stat.growing;
    });

    return weekData;
  });

  // Lấy tất cả các keys để làm bars (trừ week và weekRange)
  const dataKeys =
    weeklyStats.length > 0
      ? weeklyStats[0].stats.map((stat) => stat.title)
      : [];

  // Colors cho các bars
  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#8b5cf6", // purple
    "#f59e0b", // orange
    "#ef4444", // red
    "#06b6d4", // cyan
  ];

  const handlePeriodChange = (value: string) => {
    const period = TIME_PERIODS.find((p) => p.value === value);
    if (period) {
      setSelectedPeriod(period);
    }
  };

  const handleLineToggle = (lineKey: string, checked: boolean) => {
    setVisibleLines((prev) => ({
      ...prev,
      [lineKey]: checked,
    }));
  };

  // Filter visible data keys
  const visibleDataKeys = dataKeys.filter((key) => visibleLines[key]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          Thống kê tăng trưởng theo tuần (%)
        </CardTitle>
        <Select value={selectedPeriod.value} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            {TIME_PERIODS.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Checkbox controls */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-4">
          {dataKeys.map((key, index) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={visibleLines[key]}
                onCheckedChange={(checked) =>
                  handleLineToggle(key, checked as boolean)
                }
              />
              <label
                htmlFor={key}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center space-x-2"
              >
                <div
                  className="w-4 h-1 rounded"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span>{key}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <CardContent>
        {isLoading ? (
          <div className="h-[400px] relative">
            <LoadingOverlay message="Đang tải dữ liệu biểu đồ..." />
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Tăng trưởng (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value: string | number, name: string, props) => {
                    const payload = props.payload as Record<string, unknown>;
                    const actualValue = payload[`${name}_value`] as string;
                    const isGrowing = payload[`${name}_growing`] as boolean;
                    const growthIcon = isGrowing ? "↗️" : "↘️";
                    const changeText =
                      typeof value === "number" ? value.toFixed(1) : value;

                    return [
                      `${actualValue} (${changeText}% ${growthIcon})`,
                      name,
                    ];
                  }}
                  labelFormatter={(label: string, payload) => {
                    const data = payload?.[0]?.payload as Record<
                      string,
                      unknown
                    >;
                    return `${(data?.weekRange as string) || label}`;
                  }}
                />
                <Legend />
                {visibleDataKeys.map((key) => {
                  const originalIndex = dataKeys.indexOf(key);
                  return (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={colors[originalIndex % colors.length]}
                      strokeWidth={3}
                      dot={{
                        fill: colors[originalIndex % colors.length],
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: colors[originalIndex % colors.length],
                        strokeWidth: 2,
                      }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </CardContent>
    </Card>
  );
};
