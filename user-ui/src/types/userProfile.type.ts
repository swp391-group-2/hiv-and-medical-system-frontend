export type UserProfileValues = {
  patientId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  patientCode: string;
  dob: string;
  gender: string;
  address: string;
  phoneNumber: string;
  identificationCard: string;
  healthInsurance: string;
  occupation: string;
};

export type AccountUpdateFormValues = {
  email: string;
  password: string;
  confirm: string;
};
export type UserProfileUpdateValues = {
  fullName: string;
  dob: string;
  gender: string;
  address: string;
  phoneNumber: string;
  identificationCard: string;
  healthInsurance: string;
  occupation: string;
};

export type UserProfileResponse = {
  code: number;
  success: boolean;
  message: string;
  data: UserProfileValues;
};
