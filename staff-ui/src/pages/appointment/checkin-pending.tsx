import { formatDMY } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentTable } from "@/components/appointments/appointment-table";

import { useMemo } from "react";
import { useAppointments } from "@/api/appointments";
import { AppointmentFilters } from "@/components/appointments/appointment-filters";
import { LoadingOverlay } from "@/components/loading-overlay";

const CheckinPending = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useAppointments();

  const filtered = useMemo(
    () =>
      Array.isArray(appointments)
        ? appointments.filter((a) => a.status === "SCHEDULED")
        : [],
    [appointments]
  );
  console.log(filtered);
  console.log(appointments);

  if (isLoading) return <LoadingOverlay message="Đang tải..." />;
  if (isError)
    return <div className="text-red-600">{(error as Error).message}</div>;

  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh Sách Chờ Check-In</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={(f) => f.search} />
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
