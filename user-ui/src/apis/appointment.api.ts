import http from "./http";

export const URL_APPOINTMENTS = "appointments";

export type AppointmentBooking = {
  patientId: string;
  serviceId: number;
  scheduleSlotId: number | null;
  labTestSlotId: number | null;
};

const appointmentApi = {
  postAppointmentBooking: (value: AppointmentBooking) => {
    return http.post(URL_APPOINTMENTS, value).then((response) => response.data);
  },
};

export default appointmentApi;
