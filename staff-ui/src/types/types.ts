/** Re-useable status union for appointments */
export type AppointmentStatus =
  | "SCHEDULED"
  | "CHECKED_IN"
  | "LAB_COMPLETED"
  | "COMPLETED";

export type LabResultStatus = "PENDING" | "REJECTED" | "FINISHED";

export type ParameterType = "NUMERIC" | "TEXT";

export type ServiceType = "CONSULTATION" | "LAB_TEST";
export type ServiceName = "CONSULTATION" | "SCREENING" | "CONFIRMATORY";

/** Patient info */
export interface Patient {
  patientId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  patientCode: string;
  dob: string; // ISO yyyy-MM-dd
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
  sampleCodeCD4: string;
  sampleTypeCD4: string;
  sampleCodeVirus: string;
  sampleTypeVirus: string;
  results: string;
  collectedAt: string; // ISO timestamp
  status: string;
}

export interface LabTestParameter {
  labTestParameterId: number;
  parameterName: string;
  parameterType: ParameterType;
  unitCD4: string;
  unitViralLoad: string;
  normalRangeCD4: string;
  normalRangeStringViralLoad: string;
  description: string;
}

/** Lab result, including its own nested sample */
export interface LabResult {
  labResultId: number;
  resultText: string;
  resultNumericCD4: number;
  resultNumericViralLoad: number;
  resultStatus: LabResultStatus;
  conclusion: string;
  note: string;
  resultDate: string;
  labSample: LabSample;
  labTestParameter: LabTestParameter;
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
  dosageForm: string;
  sideEffect: string;
  instructions: string;
  prescriptionItems: PrescriptionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientPrescription {
  id: number;
  duration: string;
  note: string;
  createdAt: string;
  prescriptionDefaultId: number;
  prescriptionDefaultName: string;
  patientPrescriptionItems: PatientPresItem[];
}

export interface PatientPresItem {
  id: number;
  dosage: string;
  frequency: string;
  quantity: number;
  medication: Medication;
}

/** The full appointment DTO */
export interface Appointment {
  appointmentId: number;
  appointmentCode: string;
  status: AppointmentStatus;
  patient: Patient;

  serviceId: number;
  serviceName: ServiceName;
  serviceType: ServiceType;
  price: number;
  note: string;

  labTestSlotId: number | null;
  doctorName: string;

  scheduleSlotId: number | null;
  date: string; // yyyy-MM-dd
  startTime: string;
  endTime: string;
  slotDescription: string;

  labSampleId: number | null;
  labSample: LabSample;
  labResult: LabResult;
  patientPrescription: PatientPrescription;
}

export type Response<T> = {
  code: number;
  success: boolean;
  message: string;
  data: Array<T>;
};

export type ResponseSingleObject<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T;
};
