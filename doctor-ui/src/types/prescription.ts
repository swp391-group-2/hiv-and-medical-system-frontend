export interface Medication {
  medicationId: number;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
}

export interface patientPrescriptionItems {
  prescriptionItemId: number;
  dosage: string;  //lieu dung
  frequency: string; //tan suat
  duration: string; //thoi gian
  quantity: number;  //so luong
  medication: Medication;
}

export interface patientPrescription {
  prescriptionId: number;
  prescriptionDefaultName: string;
  contraindication: string;
  sideEffect: string;
  instructions: string;
  patientPrescriptionItems: patientPrescriptionItems[];
  dosageForm: string;
  duration: string;
  note:string
}

export interface PrescriptionResponse {
  prescription: patientPrescription;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateIssued: string;
  nextAppointmentDate: string;
}
