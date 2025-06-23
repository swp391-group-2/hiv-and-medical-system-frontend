export interface Medication {
  medicationId: number;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
}

export interface PatientPrescriptionItem {
  id: number;
  dosage: string;
  frequency: string;
  quantity: number;
  medication: Medication;
}

export interface Prescription {
  id: number;
  duration: number;
  note: string;
  createdAt: string;
  prescriptionDefaultId: number;
  prescriptionDefaultName: string;
  patientPrescriptionItems: PatientPrescriptionItem[];
}

export interface PrescriptionsResponse {
  code: number;
  success: boolean;
  message: string;
  data: Prescription;
}
