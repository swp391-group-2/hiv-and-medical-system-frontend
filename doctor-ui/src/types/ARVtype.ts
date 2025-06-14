export interface Protocol {
  id: number; 
  name: string;
  level: string;
  ingredients: string[];
  notes: string[];
}

export interface Alerts {
  allergy: string;
  comorbid: string;
}

export interface LatestTestResult {
  cd4: number;
  viralLoad: string;
  date: string;
}

export interface PatientInfo {
  id: string;
  name: string;
  age: number;
  weight: string;
}

export interface TreatmentHistory {
  protocol: string;
  status: string;
  time: string;
  duration: string;
  notes: string;
}
