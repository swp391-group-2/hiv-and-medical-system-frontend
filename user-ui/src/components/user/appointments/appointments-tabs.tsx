import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentLabels, AppointmentsList } from "./appointments-list";
import type { AppointmentEntry } from "@/types/appointment.type";

export type AppointmentsTabsProps = {
  booked: AppointmentEntry[];
  waiting: AppointmentEntry[];
  finished: AppointmentEntry[];
  cancel: AppointmentEntry[];
  expired: AppointmentEntry[];
};

const AppointmentsTabs = ({
  booked,
  waiting,
  finished,
  cancel,
  expired,
}: AppointmentsTabsProps) => {
  return (
    <section className="pr-10">
      <Tabs defaultValue="booked_success">
        <TabsList>
          <TabsTrigger value="booked_success">Đặt thành công</TabsTrigger>
          <TabsTrigger value="waiting">Chờ khám</TabsTrigger>
          <TabsTrigger value="finished">Đã khám</TabsTrigger>
          <TabsTrigger value="cancel">Đã Hủy</TabsTrigger>
          <TabsTrigger value="expired">Đã hết hạn</TabsTrigger>
        </TabsList>
        <AppointmentLabels />

        <TabsContent value="booked_success">
          <AppointmentsList list={booked} />
        </TabsContent>

        <TabsContent value="waiting">
          <AppointmentsList list={waiting} />
        </TabsContent>

        <TabsContent value="finished">
          <AppointmentsList list={finished} />
        </TabsContent>

        <TabsContent value="cancel">
          <AppointmentsList list={cancel} />
        </TabsContent>
        <TabsContent value="expired">
          <AppointmentsList list={expired} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentsTabs;
