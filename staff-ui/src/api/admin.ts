import http from "./http";
import {
  type Response,
  type ResponseSingleObject,
  type Patient,
} from "@/types/types";
import {
  type Doctor,
  type CreateDoctorRequest,
  type UpdateDoctorRequest,
} from "@/types/doctor";
import { type Staff, type CreateStaffRequest } from "@/types/staff";
import type {
  LabTechnician,
  CreateLabTechnicianRequest,
} from "@/types/lab-technicians";
import type { CreateManagerRequest, Manager } from "@/types/manager";

//---------------------------doctor accounts---------------------------
export const getAllDoctorAccounts = async (): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors?size=100`);
  return data.data;
};
export const addDoctorAccount = async (
  doctorData: CreateDoctorRequest
): Promise<Doctor> => {
  const { data } = await http.post<ResponseSingleObject<Doctor>>(
    `/doctors`,
    doctorData
  );
  return data.data;
};
export const updateDoctorAccount = async (
  doctorId: string,
  updateData: UpdateDoctorRequest
): Promise<Doctor> => {
  const { data } = await http.put<ResponseSingleObject<Doctor>>(
    `/doctors/${doctorId}`,
    updateData
  );
  return data.data;
};
//---------------------------Users----------------------------
export const disableUserAccount = async (userId: string): Promise<void> => {
  await http.put(`/users/${userId}/updateStatus`, {
    active: false,
  });
};
export const activeUserAccount = async (userId: string): Promise<void> => {
  await http.put(`/users/${userId}/updateStatus`, {
    active: true,
  });
};

// Update user name function for staff and lab technicians
export const updateUserFullName = async (
  userId: string,
  fullName: string
): Promise<void> => {
  await http.put(`/users/${userId}`, {
    fullName: fullName,
  });
};
//---------------------------patient accounts---------------------------
export const getAllPatientAccounts = async (): Promise<Patient[]> => {
  const { data } = await http.get<Response<Patient>>(`/patients`);
  return data.data;
};

//---------------------------staff accounts---------------------------
export const disableStaffAccount = async (staffId: string): Promise<void> => {
  await http.put(`/users/${staffId}/updateStatus`, {
    active: false,
  });
};
export const activeStaffAccount = async (staffId: string): Promise<void> => {
  await http.put(`/users/${staffId}/updateStatus`, {
    active: true,
  });
};
export const getAllStaffAccounts = async (): Promise<Staff[]> => {
  const { data } = await http.get<Response<Staff>>(`/staffs`);
  return data.data;
};
export const addStaffAccount = async (
  staffData: CreateStaffRequest
): Promise<Staff> => {
  const { data } = await http.post<ResponseSingleObject<Staff>>(
    `/staffs`,
    staffData
  );
  return data.data;
};

// Update staff name using staffId
export const updateStaffFullName = async (
  staffId: string,
  fullName: string
): Promise<void> => {
  await http.put(`/users/${staffId}`, {
    fullName: fullName,
  });
};
//---------------------------lab accounts---------------------------
export const getAllLabAccounts = async (): Promise<LabTechnician[]> => {
  const { data } = await http.get<Response<LabTechnician>>(`/lab-technicians`);
  return data.data;
};
export const addLabAccount = async (
  labData: CreateLabTechnicianRequest
): Promise<LabTechnician> => {
  const { data } = await http.post<ResponseSingleObject<LabTechnician>>(
    `/lab-technicians`,
    labData
  );
  return data.data;
};

// Update lab technician name using userId (lab techs use userId, staff use staffId)
export const updateLabTechnicianFullName = async (
  labTechnicianId: string,
  fullName: string
): Promise<void> => {
  await http.put(`/users/${labTechnicianId}`, {
    fullName: fullName,
  });
};

//---------------------------manager accounts---------------------------
export const getAllManagerAccounts = async (): Promise<Manager[]> => {
  const { data } = await http.get<Response<Manager>>(`/managers`);
  return data.data;
};
export const addManagerAccount = async (
  managerData: CreateManagerRequest
): Promise<Manager> => {
  const { data } = await http.post<ResponseSingleObject<Manager>>(
    `/managers`,
    managerData
  );
  return data.data;
};
