export interface Slot {
  id: number;
  slotNumber: number;
  startTime: string;
  endTime: string;
  description: string;
}

export interface ScheduleSlot {
  id: number;
  scheduleId: number;
  slot: Slot;
  status: "AVAILABLE" | "BOOKED" | "FINISHED";
}
