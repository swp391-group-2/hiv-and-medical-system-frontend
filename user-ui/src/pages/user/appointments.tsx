import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="w-full mt-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-5">Lịch khám</h2>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon />
                    <span>Ngày khám</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-md"
              />
            </SelectContent>
          </Select>
          {/*Time*/}
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon />
                    <span>Giờ khám</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
      </div>
      <div>Appointments Page</div>
    </section>
  );
};

export default Appointments;
