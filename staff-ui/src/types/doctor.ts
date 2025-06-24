export interface Doctor {
  doctorId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  doctorCode: string;
  specialization: string;
  licenseNumber: string;
  urlImage: string;
}

export interface Schedule {
  id: number;
  workDate: string; // e.g. "2025-06-24"
  scheduleSlots: ScheduleSlot[];
}

export interface ScheduleSlot {
  id: number;
  scheduleId: number;
  slot: SlotDetail;
  status: string;
}

export interface SlotDetail {
  id: number;
  slotNumber: number;
  startTime: string;
  endTime: string;
  description: string;
}
