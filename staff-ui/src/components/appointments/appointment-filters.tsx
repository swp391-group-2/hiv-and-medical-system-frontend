import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Calendar as CalendarIcon, Clock, Funnel, Search } from "lucide-react";
import { useState } from "react";

export type Filters = {
  search: string;
  date: Date | undefined;
  time: string;
  type: string;
};

export function AppointmentFilters({
  onApply,
}: {
  onApply: (f: Filters) => void;
}) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [type, setType] = useState("");

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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : "Tất cả ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>

          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="w-[140px] justify-start">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tất cả giờ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Tất cả giờ</SelectItem>
              <SelectItem value="08:00">08:00</SelectItem>
              <SelectItem value="09:30">09:30</SelectItem>
              <SelectItem value="10:15">10:15</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[200px] justify-start">
              <Funnel className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tất cả loại khám" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Tất cả loại khám</SelectItem>
              <SelectItem value="Khám thường">Khám thường</SelectItem>
              <SelectItem value="Xét nghiệm sàng lọc">
                Xét nghiệm sàng lọc
              </SelectItem>
              <SelectItem value="Xét nghiệm khẳng định">
                Xét nghiệm khẳng định
              </SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => onApply({ search, date, time, type })}>
            Áp dụng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
