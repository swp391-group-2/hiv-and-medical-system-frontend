import { formatDMY } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import { sampleAppointments } from "@/raw-data/appointments/data";
import {
  AppointmentFilters,
  type Filters,
} from "@/components/appointments/appointment-filters";
import { useEffect, useMemo, useState } from "react";
import type { Appointment } from "@/types/types";

const CheckinPending = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    date: undefined,
    time: "",
    type: "",
  });

  useEffect(() => {
    setAppointments(sampleAppointments);
  }, []);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      // search by name or phone
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !a.patientName.toLowerCase().includes(q) &&
          !a.patientPhone.includes(q)
        ) {
          return false;
        }
      }
      // date (ISO YYYY-MM-DD)
      if (filters.date) {
        if (a.date !== filters.date.toISOString().slice(0, 10)) {
          return false;
        }
      }
      // time exact match
      if (filters.time && a.time !== filters.time) {
        return false;
      }
      // exam type exact match
      if (filters.type && a.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [appointments, filters]);

  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh sách chờ Check-In</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={(f) => setFilters(f)} />
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="calendar" disabled>
            Lịch
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <AppointmentTable data={filtered} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CheckinPending;
