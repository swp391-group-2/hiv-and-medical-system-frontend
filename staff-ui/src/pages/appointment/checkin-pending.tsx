import { formatDMY } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import { sampleAppointments } from "@/raw-data/appointments/data";

const CheckinPending = () => {
  return (
    <section className="w-full mt-7">
      <div>
        <h1 className="text-3xl font-bold mb-5">Danh sách chờ Check-In</h1>
        <p className="text-gray-500">
          Hôm nay là: {formatDMY(new Date().toISOString())}
        </p>
      </div>
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="calendar">Lịch</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <AppointmentTable data={sampleAppointments} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CheckinPending;
