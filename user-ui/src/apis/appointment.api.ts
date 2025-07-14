import http from "./http";
export const URL_APPOINTMENTS_TICKET = "appointments/tickets/exchange";
export const URL_APPOINTMENTS = "payments/create-session";
const getAppointmentCancelUrl = (appointmentId: number) => {
  return `appointments/${appointmentId}/cancel`;
};

export type AppointmentBooking = {
  patientId: string;
  serviceId: number;
  scheduleSlotId: number | null;
  labTestSlotId: number | null;
};

interface BookingConfirmResponse {
  code: number;
  success: boolean;
  data: string;
}

const appointmentApi = {
  postAppointmentBooking: (value: AppointmentBooking) => {
    return http
      .post<BookingConfirmResponse>(URL_APPOINTMENTS, value)
      .then((response) => response.data);
  },
  postAppointmentBookingWithTicket: (value: AppointmentBooking) => {
    return http
      .post<BookingConfirmResponse>(`${URL_APPOINTMENTS_TICKET}`, value)
      .then((response) => response.data);
  },
  cancelAppointment: (appointmentId: number) => {
    return http
      .post(getAppointmentCancelUrl(appointmentId))
      .then((response) => response.data);
  },
};

export default appointmentApi;
