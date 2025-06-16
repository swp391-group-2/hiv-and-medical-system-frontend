import type { Doctor } from "@/types/doctor.type";
import type {
  ScheduleSlot,
  TestScheduleSlotEntry,
} from "@/types/schedule.type";
import type { Service } from "@/types/service.type";
import type { UserProfileValues } from "@/types/userProfile.type";
import { create } from "zustand";

interface BookingState {
  user: UserProfileValues | null;
  doctor: Doctor | null;
  service: Service | null;
  scheduleSlot: ScheduleSlot | null;
  labTestSlot: TestScheduleSlotEntry | null;
}

interface BookingActions {
  setUser: (user: UserProfileValues | null) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setService: (service: Service | null) => void;
  setScheduleSlot: (scheduleSlot: ScheduleSlot | null) => void;
  setLabTestSlot: (labTestSlot: TestScheduleSlotEntry | null) => void;
  reset: () => void;
}

const useBookingStore = create<BookingState & BookingActions>((set) => ({
  user: null,
  doctor: null,
  service: null,
  scheduleSlot: null,
  labTestSlot: null,
  setUser: (user) => set({ user }),
  setDoctor: (doctor) => set({ doctor }),
  setService: (service) => set({ service }),
  setScheduleSlot: (scheduleSlot) => set({ scheduleSlot }),
  setLabTestSlot: (labTestSlot) => set({ labTestSlot }),
  reset: () =>
    set({
      user: null,
      doctor: null,
      service: null,
      scheduleSlot: null,
      labTestSlot: null,
    }),
}));

export default useBookingStore;
export type { BookingState, BookingActions };
