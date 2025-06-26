export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  slotNumber: number;
}

export interface ScheduleAppointment {
  appointmentId: number;
  appointmentCode: string;
  date: string;
  startTime: string;
  endTime: string;
  doctorName: string;
  patient: {
    patientId: string;
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
  };
  serviceName: string;
  serviceType: string;
  status: string;
  slotDescription: string;
  note?: string;
  labResult?: object;
  labSample?: object;
  patientPrescription?: object;
  price: number;
  scheduleSlotId: number;
}

export interface WeeklyScheduleData {
  [date: string]: {
    [slotNumber: number]: ScheduleAppointment[];
  };
}

export interface DayColumn {
  date: string;
  dayName: string;
  dayNumber: string;
}
