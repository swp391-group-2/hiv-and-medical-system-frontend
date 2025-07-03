import { useFeaturedStats } from "@/api/stats";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Users,
} from "lucide-react";
import { LoadingOverlay } from "./loading-overlay";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const StatCardsSection = () => {
  const [startDate, setStartDate] = useState<Date>(new Date("2025-06-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-07-02"));

  // API dates - chỉ update khi nhấn nút xác nhận
  const [apiStartDate, setApiStartDate] = useState<Date>(
    new Date("2025-06-01")
  );
  const [apiEndDate, setApiEndDate] = useState<Date>(new Date("2025-07-02"));

  // Format dates to string for API
  const formatDateForAPI = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // Xử lý khi nhấn nút xác nhận
  const handleConfirm = () => {
    setApiStartDate(startDate);
    setApiEndDate(endDate);
  };

  const {
    data: featuredStats = [],
    isLoading,
    isError,
    error,
  } = useFeaturedStats(
    formatDateForAPI(apiStartDate),
    formatDateForAPI(apiEndDate)
  );

  if (isLoading) return <LoadingOverlay message="Đang tải số liệu..." />;

  if (isError) {
    console.log(error.message);
    toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
  }
  return (
    <div className="space-y-6">
      {/* Date Selection Section */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg items-end">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Từ ngày</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => date && setStartDate(date)}
                initialFocus
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Đến ngày</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-black " />
                {endDate ? (
                  format(endDate, "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => date && setEndDate(date)}
                initialFocus
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Confirm Button */}
        <div className="flex">
          <Button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            Xác nhận
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
                        {/* <p className="mt-2 text-sm font-semibold text-gray-700">{`Từ ${format(
                          apiStartDate,
                          "dd/MM/yyyy"
                        )} đến ${format(apiEndDate, "dd/MM/yyyy")}`}</p> */}
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
                        {/* <p className="mt-2 text-sm font-semibold text-gray-700">{`Từ ${format(
                          apiStartDate,
                          "dd/MM/yyyy"
                        )} đến ${format(apiEndDate, "dd/MM/yyyy")}`}</p> */}
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
                        {/* <p className="mt-2 text-sm font-semibold text-gray-700">{`Từ ${format(
                          apiStartDate,
                          "dd/MM/yyyy"
                        )} đến ${format(apiEndDate, "dd/MM/yyyy")}`}</p> */}
                      </div>
                      <CalendarIcon className="h-8 w-8 text-purple-600" />
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
                        {/* <p className="mt-2 text-sm font-semibold text-gray-700">{`Từ ${format(
                          apiStartDate,
                          "dd/MM/yyyy"
                        )} đến ${format(apiEndDate, "dd/MM/yyyy")}`}</p> */}
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
    </div>
  );
};
