import React from "react";
import AppointmentCard from "./appointmentCard";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";

type Props = {
  appointments: DoctorScheduleAppointment[];
};

const AppointmentList: React.FC<Props> = ({ appointments }) => {
  return (
    <div>
      {appointments.map((item, index) => (
        <AppointmentCard key={index} data={item} />
      ))}
    </div>
  );
};

export default AppointmentList;
