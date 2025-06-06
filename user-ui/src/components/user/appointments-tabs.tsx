import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentLabels, AppointmentsList } from "./appointments-list";
import type { Slot } from "@/pages/user/appointments";
export interface AppointmentInfo {
  id: string;
  doctor: string;
  type: string;
  date: Date;
  time: Slot;
}

export type AppointmentsTabsProps = {
  booked: AppointmentInfo[];
  waiting: AppointmentInfo[];
  finished: AppointmentInfo[];
  comeback: AppointmentInfo[];
};

const AppointmentsTabs = ({
  booked,
  waiting,
  finished,
  comeback,
}: AppointmentsTabsProps) => {
  return (
    <section className="pr-10">
      <Tabs defaultValue="booked_success">
        <TabsList>
          <TabsTrigger value="booked_success">Đặt thành công</TabsTrigger>
          <TabsTrigger value="waiting">Chờ khám</TabsTrigger>
          <TabsTrigger value="finished">Đã khám</TabsTrigger>
          <TabsTrigger value="comeback">Tái khám</TabsTrigger>
        </TabsList>
        <AppointmentLabels />
        {/*Booked success*/}
        <TabsContent value="booked_success">
          <AppointmentsList list={booked} />
        </TabsContent>
        {/*Waiting*/}
        <TabsContent value="waiting">
          <AppointmentsList list={waiting} />
        </TabsContent>
        {/*Finished*/}
        <TabsContent value="finished">
          <AppointmentsList list={finished} />
        </TabsContent>
        {/*Return*/}
        <TabsContent value="comeback">
          <AppointmentsList list={comeback} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentsTabs;
