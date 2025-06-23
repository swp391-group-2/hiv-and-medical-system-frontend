export interface LabSample {
  id: number;
  sampleCode: string;
  sampleType: string;
  sampleCodeCD4: string;
  sampleTypeCD4: string;
  sampleCodeVirus: string;
  sampleTypeVirus: string;
  results: string;
  collectedAt: string;
  status: string;
}

export interface LabTestParameter {
  labTestParameterId: number;
  parameterName: string;
  parameterType: "NUMERIC" | "TEXT";
  unitCD4: string;
  unitViralLoad: string;
  normalRangeCD4: string;
  normalRangeStringViralLoad: string;
  description: string;
}

export interface LabResult {
  serviceType: "SCREENING" | "CONFIRMATORY";
  serviceName: string;
  labResultId: number;
  resultText: string;
  resultNumericCD4: number;
  resultNumericViralLoad: number;
  conclusion: string;
  note: string;
  resultStatus: "FINISHED" | "PENDING" | "REJECTED";
  resultDate: string;
  labSample: LabSample;
  labTestParameter: LabTestParameter;
}

export interface LabResultResponse {
  code: number;
  success: boolean;
  message: string;
  data: LabResult[];
}
