export interface Doctor {
  doctorId: string;
  fullName: string;
  email: string;
  rating?: number;
  urlImage?: string;
}

export interface DoctorProfile {
  doctorId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  doctorCode: string;
  specialization: string;
  licenseNumber: string;
  urlImage: string;
  totalAppointment: number;
}
