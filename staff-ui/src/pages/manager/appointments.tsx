import {
  AppointmentFilters,
  type Filters,
} from "@/components/appointments/appointment-filters";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { InternalLoading, LoadingOverlay } from "@/components/loading-overlay";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import { useQueryClient } from "@tanstack/react-query";
import { useAppointments } from "@/api/appointments";
import { useMemo, useState } from "react";
import { formatDMY } from "@/lib/utils";

const ManagerAppointments = () => {
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

  const [activeTab, setActiveTab] = useState("checkin");
  const filtered = useMemo(() => {
    if (!Array.isArray(appointments)) return [];

    let statuses: string[] = [];
    switch (activeTab) {
      case "checkin":
        statuses = ["SCHEDULED"];
        break;
      case "ongoing":
        statuses = ["CHECKED_IN", "LAB_COMPLETED"];
        break;
      case "finished":
        statuses = ["COMPLETED"];
        break;
      case "canceled":
        statuses = ["CANCELLED"];
        break;
      default:
        statuses = ["SCHEDULED"];
    }

    return appointments
      .filter((a) => statuses.includes(a.status))
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
  }, [appointments, activeTab, filters]);

  if (isLoading) return <LoadingOverlay message="Đang tải..." />;
  if (isError)
    return <div className="text-red-600">{(error as Error).message}</div>;

  const handleReloadList = () => {
    queryClient.invalidateQueries({ queryKey: ["appointments"] });
  };
  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Quản lý lịch hẹn</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <AppointmentFilters onApply={setFilters} />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="checkin"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="checkin">Check-in</TabsTrigger>
            <TabsTrigger value="ongoing">Đang khám</TabsTrigger>
            <TabsTrigger value="finished">Khám/xét nghiệm xong</TabsTrigger>
            <TabsTrigger value="canceled">Lịch huỷ</TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 cursor-pointer mr-4"
            onClick={handleReloadList}
          >
            {"Làm mới "}
            <RotateCcw />
          </Button>
        </div>
        <TabsContent value="checkin">
          {isFetching ? (
            <InternalLoading message="Đang tải lại danh sách" />
          ) : (
            <AppointmentTable data={filtered} />
          )}
        </TabsContent>
        <TabsContent value="ongoing">
          {isFetching ? (
            <InternalLoading message="Đang tải lại danh sách" />
          ) : (
            <AppointmentTable data={filtered} />
          )}
        </TabsContent>

        <TabsContent value="finished">
          {isFetching ? (
            <InternalLoading message="Đang tải lại danh sách" />
          ) : (
            <AppointmentTable data={filtered} />
          )}
        </TabsContent>

        <TabsContent value="canceled">
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

export default ManagerAppointments;
