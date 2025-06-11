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

import { Funnel, Search } from "lucide-react";
import { useState } from "react";

export type Filters = {
  search: string;
  type: string;
};

export function AppointmentFilters({
  onApply,
}: {
  onApply: (f: Filters) => void;
}) {
  const [search, setSearch] = useState("");
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

          <Select defaultValue="default" value={type} onValueChange={setType}>
            <SelectTrigger className="w-[200px] justify-start cursor-pointer">
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

          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white hover:text-white"
            onClick={() => onApply({ search, type })}
          >
            Áp dụng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
