// API functions cho quản lý dịch vụ
import type {
  Service,
  UpdateServiceRequest,
  ServiceApiResponse,
} from "@/types/services";
import http from "./http";

// Debug function to check authentication
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await http.get("/services");
    console.log("API test response:", response.status);
    return true;
  } catch (error) {
    console.error("API test failed:", error);
    return false;
  }
};

// Lấy danh sách tất cả dịch vụ
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const response = await http.get<ServiceApiResponse>("/services");

    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Lỗi khi lấy danh sách dịch vụ");
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Lỗi kết nối khi lấy danh sách dịch vụ");
  }
};

// Lấy thông tin dịch vụ theo ID
export const getServiceById = async (serviceId: number): Promise<Service> => {
  try {
    const response = await http.get<ServiceApiResponse>(
      `/services/${serviceId}`
    );

    if (response.data.success && !Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Lỗi khi lấy thông tin dịch vụ");
    }
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Lỗi kết nối khi lấy thông tin dịch vụ");
  }
};

// Lấy danh sách dịch vụ theo loại
export const getServicesByType = async (
  serviceType: string
): Promise<Service[]> => {
  try {
    const response = await http.get<ServiceApiResponse>(
      `/services/type/${serviceType}`
    );

    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Lỗi khi lấy danh sách dịch vụ theo loại"
      );
    }
  } catch (error) {
    console.error("Error fetching services by type:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Lỗi kết nối khi lấy danh sách dịch vụ theo loại");
  }
};

// Cập nhật dịch vụ
export const updateService = async (
  serviceId: number,
  serviceData: UpdateServiceRequest
): Promise<Service> => {
  try {
    console.log("Updating service with data:", serviceData);
    const response = await http.put<ServiceApiResponse>(
      `/services/${serviceId}`,
      serviceData
    );
    console.log("Update service response:", response.data);

    if (response.data.success && !Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Lỗi khi cập nhật dịch vụ");
    }
  } catch (error) {
    console.error("Error updating service:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Lỗi kết nối khi cập nhật dịch vụ");
  }
};
