export type Appointment = {
  name: string;
  code: string;
  time: string;
  phone: string;
  address: string;
  note: string;
  type: 'Định kỳ' | 'Khẩn cấp' | 'Tái khám' | 'Hoàn thành';
  status: 'Chờ khám' | 'Đang khám' | 'Hoàn thành';
};
