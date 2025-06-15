export type PatientStatus = 'Hoàn thành' | 'Đang khám' | 'Chờ khám';

export interface Patient {
  name: string;
  time: string;
  type: string;
  initials: string;
  status: PatientStatus;
}
