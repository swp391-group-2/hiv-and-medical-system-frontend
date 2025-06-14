export interface Doctor {
  doctorId: string;
  userId: string;
  fullName: string;
  email: string;
  doctorCode: string;
  specialization: string;
  licenseNumber: string;
  userStatus: "ACTIVE" | "INACTIVE" | "BANNED" | string;
}
