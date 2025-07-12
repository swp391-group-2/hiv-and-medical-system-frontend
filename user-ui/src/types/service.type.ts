export interface ServiceResponse {
  code: number;
  success: boolean;
  message: string;
  data: Service;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  serviceType: string;
  imageUrl: string;
}
