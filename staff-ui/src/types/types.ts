export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  type: string;
  date: string;
  time: string;
  doctor: string;
  hasNote: boolean;
}
