import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import AppointmentsTabs from "@/components/user/appointments/appointments-tabs";
import { useQuery } from "@tanstack/react-query";
import userApi from "@/apis/user.api";
import { type AppointmentApiResponse } from "@/types/appointment.type";


const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, isLoading } = useQuery<AppointmentApiResponse>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await userApi.getPatientAppointments();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full mt-7 flex justify-center items-center mr-10">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  const schedules = data?.data || [];

  const schedulesBooked = schedules.filter(
    (schedule) => schedule.status === "SCHEDULED"
  );
  const schedulesWaiting = schedules.filter(
    (schedule) =>
      schedule.status === "CHECKED_IN" || schedule.status === "LAB_COMPLETED"
  );
  const schedulesFinished = schedules.filter(
    (schedule) => schedule.status === "COMPLETED"
  );
  const schedulesCancelled = schedules.filter(
    (schedule) => schedule.status === "CANCELLED"
  );

  return (
    <section className="w-full mt-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-primary font-bold mb-5">Lịch khám</h2>
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
              {/* {slots.map((slot) => (
                <SelectItem value={slot.id.toString()}>
                  {slot.duration}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AppointmentsTabs
        booked={schedulesBooked}
        waiting={schedulesWaiting}
        finished={schedulesFinished}
        cancel={schedulesCancelled}
      />
    </section>
  );
};

export default Appointments;
