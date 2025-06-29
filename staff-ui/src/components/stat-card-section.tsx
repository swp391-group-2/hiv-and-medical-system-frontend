import { useFeaturedStats } from "@/api/stats";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Users,
} from "lucide-react";
import { LoadingOverlay } from "./loading-overlay";
import { toast } from "sonner";

export const StatCardsSection = () => {
  const milestone = "2025-06-01";

  const {
    data: featuredStats = [],
    isLoading,
    isError,
    error,
  } = useFeaturedStats(milestone);

  if (isLoading) return <LoadingOverlay message="Đang tải số liệu..." />;

  if (isError) {
    console.log(error.message);
    toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredStats.map((item) => {
        switch (item.title) {
          case "Tổng khách hàng":
            return (
              <Card key="Tổng khách hàng">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Tổng khách hàng
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-sm text-green-600">{item.change}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            );
          case "Bác sĩ hoạt động":
            return (
              <Card key="Bác sĩ hoạt động">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Bác sĩ hoạt động
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-sm text-green-600">{item.change}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            );
          case "Tổng lịch hẹn":
            return (
              <Card key="Lịch hẹn hôm nay">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Tổng lịch hẹn
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-sm text-green-600">{item.change}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            );
          case "Doanh thu tháng":
            return (
              <Card key="Doanh thu tháng">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Doanh thu tháng
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-sm text-green-600">{item.change}</p>
                    </div>
                    {item.growing ? (
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    ) : (
                      <TrendingDown className="h-8 w-8 text-orange-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
