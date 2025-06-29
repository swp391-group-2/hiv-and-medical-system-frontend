import type { ServiceResponse } from "@/types/service.type";
import apiGuest from "./apiGuest";
const URL_SERVICES = "services";

const getServiceUrl = (serviceId: number): string => {
  return `${URL_SERVICES}/${serviceId}`;
};

const getServicesByTypeUrl = (serviceType: string): string => {
  return `${URL_SERVICES}/type/${serviceType}`;
};

const serviceApi = {
  getServiceById: (serviceId: number) => {
    return apiGuest
      .get<ServiceResponse>(getServiceUrl(serviceId))
      .then((res) => res.data);
  },
  getServicesByType: (serviceType: string) => {
    return apiGuest
      .get<ServiceResponse>(getServicesByTypeUrl(serviceType))
      .then((res) => res.data);
  },
};

export default serviceApi;
