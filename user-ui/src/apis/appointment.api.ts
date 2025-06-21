import http from "./http";

export const URL_APPOINTMENTS = "payments/create-session";

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
};

export default appointmentApi;
