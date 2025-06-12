import axios from "axios";
import { create } from "zustand";

interface BookingState {
  patientId: string;
  serviceId: number;
  scheduleSlotId: number;
  labTestSlotId: number;
}

interface BookingActions {
  setPatientId: (patientId: string) => void;
  setServiceId: (serviceId: number) => void;
  setScheduleSlotId: (scheduleSlotId: number) => void;
  setLabTestSlotId: (labTestSlotId: number) => void;
  reset: () => void;
  booking: () => Promise<void>;
}

const useBookingStore = create<BookingState & BookingActions>((set, get) => ({
  patientId: "",
  serviceId: 0,
  scheduleSlotId: 0,
  labTestSlotId: 0,
  setPatientId: (patientId) => set({ patientId }),
  setServiceId: (serviceId) => set({ serviceId }),
  setScheduleSlotId: (scheduleSlotId) => set({ scheduleSlotId }),
  setLabTestSlotId: (labTestSlotId) => set({ labTestSlotId }),
  reset: () =>
    set({
      patientId: "",
      serviceId: 0,
      scheduleSlotId: 0,
      labTestSlotId: 0,
    }),
  booking: async () => {
    const state = get();
    await axios.post("/api/booking", {
      patientId: state.patientId,
      serviceId: state.serviceId,
      scheduleSlotId: state.scheduleSlotId,
      labTestSlotId: state.labTestSlotId,
    });
  },
}));

export default useBookingStore;
export type { BookingState, BookingActions };
