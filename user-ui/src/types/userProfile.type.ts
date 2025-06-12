export type UserProfileValues = {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
  gender: string;
  dob: string; // expecting "YYYY-MM-DD"
  idNumber: string;
  insuranceNumber: string;
  occupation: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
};
