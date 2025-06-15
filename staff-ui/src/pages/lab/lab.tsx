import { useAppointments } from "@/api/appointments";
import {
  AppointmentFilters,
  type Filters,
} from "@/components/appointments/appointment-filters";
import { LabTable } from "@/components/lab/lab-table";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDMY } from "@/lib/utils";
import { useMemo, useState } from "react";

const Lab = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useAppointments();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    serviceType: "default",
  });

  const filtered = useMemo(() => {
    return appointments
      .filter(
        (a) =>
          a.status === "CHECKED_IN" && a.labResult.resultStatus !== "FINISHED"
      )
      .filter((a) => {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            a.patient.fullName.toLowerCase().includes(q) ||
            a.patient.phoneNumber.includes(q)
          );
        }
        return true;
      })
      .filter((a) => {
        if (filters.serviceType && filters.serviceType !== "default") {
          return a.serviceType === filters.serviceType;
        }
        return true;
      });
  }, [appointments, filters]);

  if (isLoading) return <LoadingOverlay message="Đang tải..." />;
  if (isError)
    return <div className="text-red-600">{(error as Error).message}</div>;
  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh Sách Chờ Xét Nghiệm</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={setFilters} />
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="calendar" disabled>
            Lịch
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <LabTable data={filtered} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Lab;
