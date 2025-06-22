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
    code: "",
    date: "default",
    startHour: "default",
    serviceType: "default",
  });

  const filtered = useMemo(() => {
    if (!Array.isArray(appointments)) return [];

    return appointments
      .filter(
        (a) =>
          a.status === "CHECKED_IN" && a.labResult.resultStatus !== "FINISHED"
      )
      .filter((a) => {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          if (a.patient.phoneNumber != null) {
            return (
              a.patient.fullName.toLowerCase().includes(q) ||
              a.patient.phoneNumber.includes(q)
            );
          } else {
            return a.patient.fullName.toLowerCase().includes(q);
          }
        }
        return true;
      })
      .filter((a) => {
        if (filters.code) {
          if (a.appointmentCode != null) {
            const q = filters.code.toLowerCase();
            return a.appointmentCode.toLowerCase() === q;
          }
        }
        return true;
      })
      .filter((a) => {
        if (filters.date && filters.date !== "default") {
          return formatDMY(a.date) === filters.date;
        }
        return true;
      })
      .filter((a) => {
        if (filters.serviceType && filters.serviceType !== "default") {
          return a.serviceType === filters.serviceType;
        }
        return true;
      })
      .filter((a) => {
        if (filters.startHour && filters.startHour !== "default") {
          return a.startTime === filters.startHour;
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
