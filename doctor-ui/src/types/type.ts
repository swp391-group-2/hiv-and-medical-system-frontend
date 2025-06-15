// src/types.ts

export type Alerts = {
  allergy: string;
  comorbid: string;
};
export interface LatestTestResult {
  cd4: number | string;
  viralLoad: string | number;
  date: string;
}

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
