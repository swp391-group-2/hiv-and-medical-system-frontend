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
    aptStatus: "default",
  });

  useEffect(() => {
    setAppointments(sampleAppointments);
  }, []);

  const filtered = useMemo(() => {
    const q = filters.search?.trim().toLowerCase() || "";

    return appointments.filter((a) => {
      // type check
      const statusMatch =
        filters.aptStatus === "default" ? true : a.status === filters.aptStatus;

      // search check
      const searchMatch =
        !q ||
        a.patientName.toLowerCase().includes(q) ||
        a.patientPhone.toLowerCase().includes(q);

      // only include if BOTH match
      return statusMatch && searchMatch;
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
