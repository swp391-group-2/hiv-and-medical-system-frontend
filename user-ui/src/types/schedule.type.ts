export interface SlotDetail {
  id: number;
  slotNumber: number;
  startTime: string;
  endTime: string;
  description: string;
}

export interface ScheduleSlot {
  id: number;
  scheduleId: number;
  slot: SlotDetail;
  status: "AVAILABLE" | "UNAVAILABLE" | string;
}

export interface DailyScheduleEntry {
  id: number;
  workDate: string;
  scheduleSlots: ScheduleSlot[];
}

export interface ScheduleApiResponse {
  code: number;
  success: boolean;
  data: DailyScheduleEntry;
}

export interface GetScheduleQueryParams {
  date: string;
}

export interface TestScheduleApiResponse {
  code: number;
  success: boolean;
  data: TestScheduleSlotEntry[]; // <-- Dữ liệu chính là một MẢNG các slot
}

export interface TestScheduleSlotEntry {
  id: number;
  date: string; // Ngày của slot này, ví dụ: "2025-06-16"
  slot: SlotDetail; // Chi tiết về khung giờ
  bookedCount: number; // Số lượng đã đặt
  maxCount: number; // Số lượng tối đa có thể đặt
  status: "AVAILABLE" | "UNAVAILABLE" | string; // Trạng thái của slot
}
