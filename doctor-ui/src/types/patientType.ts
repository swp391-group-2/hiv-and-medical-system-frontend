export interface Patient {
  patientId: string; // Mã BN
  userId?: string;
  email?: string;
  fullName: string;
  userStatus?: string;
  patientCode?: string;
  dob?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  identificationCard?: string;
  healthInsurance?: string;
  occupation?: string;
  weight?: string; // Cân nặng
  hivStatus?: "positive" | "negative"; // thêm cho filter
  screeningResult?: string;
  confirmResult?: string;
  cd4?: string | number; // CD4 count
  vl?: string;

  createdAt?: string;
  updatedAt?: string;
}
