export interface Patient {
  id: string; // Mã BN
  userId?: string;
  email?: string;
  fullName: string;
  userStatus?: string;
  patientCode?: string;
  dob: string;
  gender: string;
  address?: string;
  phoneNumber?: string;
  identificationCard?: string;
  healthInsurance?: string;
  occupation?: string;

  hivStatus?: "positive" | "negative"; // thêm cho filter
  screeningResult?: string;
  confirmResult?: string;
  cd4?: string;
  vl?: string;

  createdAt?: string;
  updatedAt?: string;
}
