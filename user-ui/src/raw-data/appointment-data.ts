import type { AppointmentsTabsProps } from "@/components/user/appointments/appointments-tabs";
import type { Slot } from "@/pages/user/appointments";

export const slots = [
  { id: 1, duration: "7:00 - 8:00" },
  { id: 2, duration: "8:00 - 9:00" },
  { id: 3, duration: "9:00 - 10:00" },
  { id: 4, duration: "10:00 - 11:00" },
  { id: 5, duration: "13:00 - 14:00" },
  { id: 6, duration: "14:00 - 15:00" },
  { id: 7, duration: "15:00 - 16:00" },
  { id: 8, duration: "16:00 - 17:00" },
] as Slot[];

export const appointmentsData: AppointmentsTabsProps = {
  booked: [
    {
      id: "A001",
      doctor: "Dr. Suzuki",
      type: "Consultation",
      date: new Date("2025-06-10"),
      time: slots[2],
    },
    {
      id: "A002",
      doctor: "Dr. Tanaka",
      type: "Check-up",
      date: new Date("2025-06-12"),
      time: slots[3],
    },
  ],
  waiting: [
    {
      id: "A003",
      doctor: "Dr. Sato",
      type: "Follow-up",
      date: new Date("2025-06-15"),
      time: slots[4],
    },
  ],
  finished: [
    {
      id: "A004",
      doctor: "Dr. Yamamoto",
      type: "Consultation",
      date: new Date("2025-05-28"),
      time: slots[5],
    },
    {
      id: "A005",
      doctor: "Dr. Nakamura",
      type: "Check-up",
      date: new Date("2025-05-30"),
      time: slots[6],
    },
  ],
  comeback: [
    {
      id: "A006",
      doctor: "Dr. Kobayashi",
      type: "Follow-up",
      date: new Date("2025-06-18"),
      time: slots[7],
    },
  ],
};
