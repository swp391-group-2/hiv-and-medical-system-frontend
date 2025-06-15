// src/types.ts

export type Alerts = {
  allergy: string;
  comorbid: string;
};

export type LatestTestResult = {
  cd4: number;
  viralLoad: string;
  date: string;
};

export type TreatmentHistory = {
  protocol: string;
  status: string;
  time: string;
  duration: string;
  notes: string;
};

export type Protocol = {
  id: string;
  name: string;
  ingredients: string[];
  level: string;
  notes: string[];
};

export type PatientInfo = {
  id: string;
  name: string;
  age: number;
  weight: string;
};