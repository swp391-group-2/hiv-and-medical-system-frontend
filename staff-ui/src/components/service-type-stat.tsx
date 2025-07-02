import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { ServiceTypeStat } from "@/types/stats";
import { InternalLoading } from "./loading-overlay";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ServiceTypeStatSection = ({
  list,
  isLoading,
}: {
  list?: ServiceTypeStat[];
  isLoading: boolean;
}) => {
  // Define colors for each service type
  const COLORS = {
    CONSULTATION: "#3b82f6", // blue
    SCREENING: "#10b981", // green
    CONFIRMATORY: "#f59e0b", // amber
  };

  // Transform data for pie chart
  const chartData =
    list?.map((item) => ({
      name:
        item.service === "CONSULTATION"
          ? "Dịch vụ khám"
          : item.service === "SCREENING"
          ? "Xét nghiệm sàng lọc"
          : "Xét nghiệm khẳng định",
      value: item.count,
      percentage: item.percentage,
      color: COLORS[item.service as keyof typeof COLORS] || "#6b7280",
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Activity className="h-5 w-5 mr-2" />
          Thống kê dịch vụ khám
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <InternalLoading message="Đang tải dữ liệu" />
        ) : (
          <div className="space-y-4">
            {!list || list.length === 0 ? (
              <p className="text-sm font-semibold text-gray-500">
                Không có dữ liệu
              </p>
            ) : (
              <div className="space-y-6">
                {/* Pie Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ percentage }) =>
                          `${Number(percentage || 0).toFixed(1)}%`
                        }
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          `${value} lượt`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {chartData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {item.value} lượt
                        </span>
                        <span className="text-sm font-semibold">
                          {Number(item.percentage || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceTypeStatSection;
