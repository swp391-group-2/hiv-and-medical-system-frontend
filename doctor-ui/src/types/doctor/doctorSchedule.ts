import type { ScheduleSlot } from "./scheduleSlot";


export interface DoctorSchedule {
  id: number;
  workDate: string;
  scheduleSlots: ScheduleSlot[];
}
