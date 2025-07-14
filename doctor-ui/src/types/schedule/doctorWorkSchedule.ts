// Types cho lịch làm việc của bác sĩ
export interface DoctorWorkSlot {
  id: number;
  slotNumber: number;
  startTime: string;
  endTime: string;
  description: string;
}

export interface DoctorScheduleSlot {
  id: number;
  scheduleId: number;
  slot: DoctorWorkSlot;
  status:
    | "AVAILABLE"
    | "UNAVAILABLE"
    | "BLOCKED"
    | "EXPIRED"
    | "CHECKED_IN"
    | "EXPIRED_NO_CHECKED_IN";
}

export interface DoctorWorkSchedule {
  id: number;
  workDate: string;
  scheduleSlots: DoctorScheduleSlot[];
}

export type DoctorWorkScheduleList = DoctorWorkSchedule[];
