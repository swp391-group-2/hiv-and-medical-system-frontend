export interface DoctorScheduleAppointment {
  name: string;
  code: string;
  time: string;
  slot: string;
  date: string;
  phone: string;
  address: string;
  note: string;
  type: "Định kỳ" | "Khẩn cấp" | "Tái khám";
  status: "Chờ khám" | "Đang khám" | "Hoàn thành"; // thêm "Đang khám" vào đây
}
