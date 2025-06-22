import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Funnel, Search, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import { formatDMY } from "@/lib/utils";

export type Filters = {
  search: string;
  code: string;
  date: string;
  startHour: string;
  serviceType: string;
};

export function AppointmentFilters({
  onApply,
}: {
  onApply: (f: Filters) => void;
}) {
  const [search, setSearch] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [startHour, setStartHour] = useState("");
  const [date, setDate] = useState("");

  return (
    <Card className="w-full mt-4 mb-4">
      <CardHeader>
        <CardTitle>Bộ lọc</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Tìm kiếm bệnh nhân..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Nhập mã lịch hẹn..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
            />
          </div>
          <Select value={date} onValueChange={setDate}>
            <SelectTrigger className="w-[200px] justify-start cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Ngày" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Tất cả ngày</SelectItem>
              <SelectItem value={formatDMY(new Date().toISOString())}>
                Hôm nay
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={startHour} onValueChange={setStartHour}>
            <SelectTrigger className="w-[200px] justify-start cursor-pointer">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Giờ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Tất cả ca</SelectItem>
              <SelectItem value="07:00:00">7:00</SelectItem>
              <SelectItem value="08:00:00">8:00</SelectItem>
              <SelectItem value="09:00:00">9:00</SelectItem>
              <SelectItem value="10:00:00">10:00</SelectItem>
              <SelectItem value="13:00:00">13:00</SelectItem>
              <SelectItem value="14:00:00">14:00</SelectItem>
              <SelectItem value="15:00:00">15:00</SelectItem>
              <SelectItem value="16:00:00">16:00</SelectItem>
            </SelectContent>
          </Select>

          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="w-[200px] justify-start cursor-pointer">
              <Funnel className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Dịch vụ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Tất cả dịch vụ</SelectItem>
              <SelectItem value="CONSULTATION">Khám thường</SelectItem>
              <SelectItem value="SCREENING">Xét nghiệm sàng lọc</SelectItem>
              <SelectItem value="CONFIRMATORY">
                Xét nghiệm khẳng định
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white hover:text-white"
            onClick={() =>
              onApply({
                search,
                code: searchCode,
                date,
                startHour,
                serviceType,
              })
            }
          >
            Áp dụng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
