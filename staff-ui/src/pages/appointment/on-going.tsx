import { formatDMY } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import {
  AppointmentFilters,
  type Filters,
} from "@/components/appointments/appointment-filters";
import { useMemo, useState } from "react";
import { useAppointments } from "@/api/appointments";
import { InternalLoading, LoadingOverlay } from "@/components/loading-overlay";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const OngoingAppointments = () => {
  const queryClient = useQueryClient();
  const {
    data: appointments = [],
    isLoading,
    isError,
    isFetching,
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
      .filter((a) => a.status === "CHECKED_IN" || a.status === "LAB_COMPLETED")
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
            return a.appointmentCode.toLowerCase().includes(q);
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
  const handleReLoadList = () => {
    queryClient.invalidateQueries({ queryKey: ["appointments"] });
  };

  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh Sách Đang Khám</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={setFilters} />
      <Tabs defaultValue="list">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Danh sách</TabsTrigger>
            <TabsTrigger value="calendar" disabled>
              Lịch
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 cursor-pointer mr-4"
            onClick={handleReLoadList}
          >
            {"Làm mới "}
            <RotateCcw />
          </Button>
        </div>
        <TabsContent value="list">
          {isFetching ? (
            <InternalLoading message="Đang tải lại danh sách" />
          ) : (
            <AppointmentTable data={filtered} />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OngoingAppointments;
