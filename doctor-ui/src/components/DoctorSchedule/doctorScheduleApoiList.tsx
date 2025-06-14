;
import React from "react";
import AppointmentCard from "./appointmentCard";
import type { Appointment } from "@/types/appointment";

type Props = {
  appointments: Appointment[];
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
