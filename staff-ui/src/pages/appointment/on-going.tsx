import { formatDMY } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import { AppointmentFilters } from "@/components/appointments/appointment-filters";
import { useMemo } from "react";
import { useAppointments } from "@/api/appointments";

const OngoingAppointments = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useAppointments();

  const filtered = useMemo(
    () =>
      Array.isArray(appointments)
        ? appointments.filter(
            (a) => a.status === "CHECKED_IN" || a.status === "LAB_COMPLETED"
          )
        : [],
    [appointments]
  );
  if (isLoading) return <div>Loading…</div>;
  if (isError)
    return <div className="text-red-600">{(error as Error).message}</div>;

  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh Sách Đang Khám</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={(f) => f.aptStatus} />
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

export default OngoingAppointments;
