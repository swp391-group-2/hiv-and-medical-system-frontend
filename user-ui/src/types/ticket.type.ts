export interface TicketData {
  id: number;
  count: number;
  ticketType: "CONSULTATION" | "SCREENING" | "CONFIRMATORY";
  patientId: string;
  serviceName: string;
  imageUrl: string;
  price: number;
}

export interface TicketResponse {
  code: number;
  success: boolean;
  message: string;
  data: TicketData[];
}

export interface TicketStatusResponse {
  code: number;
  success: boolean;
  message: string;
  data: TicketData;
}
