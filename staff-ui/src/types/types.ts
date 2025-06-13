/** Re-useable status union for appointments */
export type AppointmentStatus =
  | "SCHEDULED"
  | "CHECKED_IN"
  | "LAB_COMPLETED"
  | "COMPLETED";

/** Patient info */
export interface Patient {
  patientId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  patientCode: string;
  dob: string; // YYYY-MM-DD
  gender: string;
  address: string;
  phoneNumber: string;
  identificationCard: string;
  healthInsurance: string;
  occupation: string;
}

/** Lab sample details */
export interface LabSample {
  id: number;
  sampleCode: string;
  sampleType: string;
  results: string;
  collectedAt: string; // ISO timestamp
  status: string;
}

/** Lab result, including its own nested sample */
export interface LabResult {
  labResultId: number;
  resultText: string;
  resultNumeric: number;
  resultNumericCD4: number;
  resultNumericViralLoad: number;
  conclusion: string;
  note: string;
  resultDate: string; // YYYY-MM-DD
  labSample: LabSample;
}

/** Medication details */
export interface Medication {
  medicationId: number;
  name: string;
  description: string;
  dosageForm: string;
  strength: string;
}

/** One line item in a prescription */
export interface PrescriptionItem {
  prescriptionItemId: number;
  dosage: string;
  frequency: string;
  duration: string;
  medication: Medication;
}

/** Prescription, with list of items */
export interface Prescription {
  prescriptionId: number;
  name: string;
  contraindication: string;
  sideEffect: string;
  instructions: string;
  prescriptionDate: string; // YYYY-MM-DD
  prescriptionItems: PrescriptionItem[];
}

/** The full appointment DTO */
export interface Appointment {
  appointmentId: number;
  status: AppointmentStatus;
  patient: Patient;

  serviceId: number;
  serviceName: string;
  serviceType: string;
  price: number;

  labTestSlotId: number;
  doctorName: string;

  scheduleSlotId: number;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "09:30"
  endTime: string; // e.g. "10:00"
  slotDescription: string;

  labSampleId: number;
  labSample: LabSample;

  labResult: LabResult;

  prescription: Prescription;
}

export type Response<T> = {
  code: number;
  success: boolean;
  result: Array<T>;
};
