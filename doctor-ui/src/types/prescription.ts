export interface Medication {
  medicationId: number;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
}

export interface PrescriptionItem {
  prescriptionItemId: number;
  dosage: string;
  frequency: string;
  duration: string;
  medication: Medication;
}

export interface Prescription {
  prescriptionId: number;
  name: string;
  contraindication: string;
  sideEffect: string;
  instructions: string;
  prescriptionItems: PrescriptionItem[];
  dosageForm: string;
}

export interface PrescriptionResponse {
  prescription: Prescription;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateIssued: string;
  nextAppointmentDate: string;
}
