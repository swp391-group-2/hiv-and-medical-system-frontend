import type { Schedule } from "@/types/doctor";

function createSchedule(chosenWeek: Schedule[]): Schedule[] {
  let scheduleList = [] as Schedule[];
  for (let numOfDay = 0; numOfDay < 7; numOfDay++) {
    let s: Schedule = {} as Schedule;
    for (let i = 0; i < 8; i++) {
      if (chosenWeek[numOfDay].scheduleSlots[i]) {
      }
    }
  }
  return scheduleList;
}
