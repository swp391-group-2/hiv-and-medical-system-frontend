export interface LabSample {
  sampleId: string;
  status: "COLLECTED" | "SENT" | "IN_PROGRESS" | "LAB_COMPLETED" | "CANCELLED";
}
