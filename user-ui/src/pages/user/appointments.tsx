import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import AppointmentsTabs from "@/components/user/appointments/appointments-tabs";
import { appointmentsData, slots } from "@/raw-data/appointment-data";

export interface Slot {
  id: number;
  duration: string;
}

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="w-full mt-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-5">Lịch khám</h2>
        <div className="flex gap-4 mr-10">
          <Select>
            <SelectTrigger className="cursor-pointer">
              <SelectValue
                placeholder={
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon />
                    <span>{date ? date.toDateString() : "Ngày khám"}</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setDate(date)}
                className="rounded-md border shadow-md"
              />
            </SelectContent>
          </Select>
          {/*Time*/}
          <Select>
            <SelectTrigger className="cursor-pointer">
              <SelectValue
                placeholder={
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock />
                    <span>Giờ khám</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {slots.map((slot) => (
                <SelectItem value={slot.id.toString()}>
                  {slot.duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AppointmentsTabs {...appointmentsData} />
    </section>
  );
};

export default Appointments;
