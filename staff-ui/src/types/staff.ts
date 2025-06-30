export interface Staff {
  email: string;
  fullName: string;
  status: string;
  role: string;
  staffId: string;
  userId: string; // Thêm field này để sử dụng API disable/active user account
  managerCode: string;
  labTechnicianCode: string;
  labTechnicianId: string;
  staffCode: string;
  managerId: string;
}

export interface CreateStaffRequest {
  email: string;
  fullName: string;
  password: string;
}
