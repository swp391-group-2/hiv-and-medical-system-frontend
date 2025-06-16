export interface User {
  doctorId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  doctorCode: string | null;
  specialization: string;
  licenseNumber: string;
  urlImage: string | null;
}
