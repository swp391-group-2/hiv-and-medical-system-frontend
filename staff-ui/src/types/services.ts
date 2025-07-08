// Types cho quản lý dịch vụ
export interface Service {
  id: number;
  name: string;
  price: number;
  serviceType: "CONSULTATION" | "SCREENING" | "CONFIRMATORY";
}

export interface CreateServiceRequest {
  name: string;
  price: number;
  serviceType: "CONSULTATION" | "SCREENING" | "CONFIRMATORY";
}

export interface UpdateServiceRequest {
  name: string;
  price: number;
  serviceType: "CONSULTATION" | "SCREENING" | "CONFIRMATORY";
}

export interface ServiceApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: Service | Service[];
}

// Service Type enum for display
export const SERVICE_TYPE_LABELS = {
  CONSULTATION: "Tư vấn",
  SCREENING: "Sàng lọc",
  CONFIRMATORY: "Khẳng định",
} as const;

export const SERVICE_TYPE_OPTIONS = [
  { value: "CONSULTATION", label: "Tư vấn" },
  { value: "SCREENING", label: "Sàng lọc" },
  { value: "CONFIRMATORY", label: "Khẳng định" },
] as const;
