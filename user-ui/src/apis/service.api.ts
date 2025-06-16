import type { ServiceResponse } from "@/types/service.type";
import apiGuest from "./apiGuest";
const URL_SERVICES = "services"; // URL gốc để lấy danh sách dịch vụ

const getServiceUrl = (serviceId: number): string => {
  return `${URL_SERVICES}/${serviceId}`; // URL để lấy thông tin dịch vụ theo ID
};

const getServicesByTypeUrl = (serviceType: string): string => {
  return `${URL_SERVICES}/type/${serviceType}`; // URL để lấy dịch vụ theo loại
};

const serviceApi = {
  getServiceById: (serviceId: number) => {
    return apiGuest
      .get<ServiceResponse>(getServiceUrl(serviceId))
      .then((res) => res.data); // Trả về dữ liệu ServiceResponse
  },
  getServicesByType: (serviceType: string) => {
    return apiGuest
      .get<ServiceResponse>(getServicesByTypeUrl(serviceType))
      .then((res) => res.data); // Trả về danh sách ServiceResponse
  },
};

export default serviceApi;
