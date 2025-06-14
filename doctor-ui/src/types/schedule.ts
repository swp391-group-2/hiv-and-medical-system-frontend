export interface ScheduleSlot {
  id: string;
  status: "AVAILABLE" | "BOOKED" | "FINISHED";
  slot: {
    description?: string;
    startTime: string;
  };
}

export interface DoctorSchedule {
  scheduleId: string;
  date: string;
  doctorId: string;
  scheduleSlots: ScheduleSlot[];
}
