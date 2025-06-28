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

//---------------------------doctor accounts---------------------------
export const getAllDoctorAccounts = async (): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors`);
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
}
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
}
export const activeStaffAccount = async (staffId: string): Promise<void> => {
  await http.put(`/users/${staffId}/updateStatus`, {
    active: true,
  });
}
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
// export const updateStaffAccount = async () => {};
// export const deleteStaffAccount = async () => {};
