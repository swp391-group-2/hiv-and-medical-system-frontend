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
import { type AppointmentsTabsProps } from "@/components/user/appointments-tabs";
import AppointmentsTabs from "@/components/user/appointments-tabs";

export interface Slot {
  id: number;
  duration: string;
}

const slots = [
  { id: 1, duration: "7:00 - 8:00" },
  { id: 2, duration: "8:00 - 9:00" },
  { id: 3, duration: "9:00 - 10:00" },
  { id: 4, duration: "10:00 - 11:00" },
  { id: 5, duration: "13:00 - 14:00" },
  { id: 6, duration: "14:00 - 15:00" },
  { id: 7, duration: "15:00 - 16:00" },
  { id: 8, duration: "16:00 - 17:00" },
] as Slot[];

const appointmentsData: AppointmentsTabsProps = {
  booked: [
    {
      id: "A001",
      doctor: "Dr. Suzuki",
      type: "Consultation",
      date: new Date("2025-06-10"),
      time: slots[2],
    },
    {
      id: "A002",
      doctor: "Dr. Tanaka",
      type: "Check-up",
      date: new Date("2025-06-12"),
      time: slots[3],
    },
  ],
  waiting: [
    {
      id: "A003",
      doctor: "Dr. Sato",
      type: "Follow-up",
      date: new Date("2025-06-15"),
      time: slots[4],
    },
  ],
  finished: [
    {
      id: "A004",
      doctor: "Dr. Yamamoto",
      type: "Consultation",
      date: new Date("2025-05-28"),
      time: slots[5],
    },
    {
      id: "A005",
      doctor: "Dr. Nakamura",
      type: "Check-up",
      date: new Date("2025-05-30"),
      time: slots[6],
    },
  ],
  comeback: [
    {
      id: "A006",
      doctor: "Dr. Kobayashi",
      type: "Follow-up",
      date: new Date("2025-06-18"),
      time: slots[7],
    },
  ],
};

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
