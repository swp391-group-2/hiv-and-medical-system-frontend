import MedicalFacilityInfo from "@/components/appointmenBooking/medical-facility-info";
import TimeSlotSelector from "@/components/appointmenBooking/time-slot-selector";
import WeekCalendar from "@/components/appointmenBooking/week-calender";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useState } from "react";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const goToPrevWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  return (
    <section>
      <div className="container mx-auto min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MedicalFacilityInfo />
            </div>
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-lg py-0 overflow-hidden">
                <div className="flex">
                  <div className="bg-cyan-400 text-white px-6 py-3   flex-1">
                    <span className="font-medium text-xl">
                      Vui lòng chọn ngày khám
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <WeekCalendar
                    currentWeek={currentWeek}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onPrevWeek={goToPrevWeek}
                    onNextWeek={goToNextWeek}
                  />
                  {selectedDate && (
                    <div className="mt-6">
                      <TimeSlotSelector
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                      />
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="mt-6 flex justify-end">
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2">
                        Đặt lịch khám
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
