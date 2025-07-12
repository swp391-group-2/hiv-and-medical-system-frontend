export interface LabTechnician {
  email: string;
  fullName: string;
  status: string;
  role: string;
  labTechnicianId: string;
  userId?: string; // Add userId field for API calls
}
export interface CreateLabTechnicianRequest {
  email: string;
  fullName: string;
  password: string;
}
