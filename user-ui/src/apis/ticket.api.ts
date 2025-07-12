import type { TicketResponse, TicketStatusResponse } from "@/types/ticket.type";
import http from "./http";

const URL_TICKET = "patients/me/tickets";

const ticketApi = {
  getTickets: async () => {
    return http.get<TicketResponse>(URL_TICKET).then((res) => res.data);
  },
  getTicketByStatus: async (status: string) => {
    return http
      .get<TicketStatusResponse>(`${URL_TICKET}/status`, {
        params: { status },
      })
      .then((res) => res.data);
  },
};

export default ticketApi;
