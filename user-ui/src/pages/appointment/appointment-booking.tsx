import MedicalFacilityInfo from "@/components/appointmenBooking/medical-facility-info";

import TimeSlotSelector from "@/components/appointmenBooking/time-slot-selector";
import WeekCalendar from "@/components/appointmenBooking/week-calender";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Undo2 } from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const { serviceType } = useParams<{ serviceType: string }>();

  const handleBooking = () => {
    if (location.pathname.includes("doctors")) {
      navigate(
        `/services/select-profile-booking/doctors/${location.pathname
          .split("/")
          .pop()}`
      );
    } else if (serviceType?.includes("screeningtest")) {
      navigate("/services/select-profile-booking/screeningtest");
    } else if (serviceType?.includes("confirmatorytest")) {
      navigate("/services/select-profile-booking/confirmatorytest");
    }
  };

  return (
    <section>
      <div className="container mx-auto min-h-screen">
        <div className="mt-7">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MedicalFacilityInfo />
            </div>
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-lg py-0 overflow-hidden">
                <div className="flex">
                  <div className="bg-primary text-white px-6 py-3   flex-1">
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
                      <Button
                        onClick={handleBooking}
                        className=" text-white px-8 py-2"
                      >
                        Đặt lịch khám
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              <Button
                onClick={handleBack}
                variant="ghost"
                className="mt-2.5 flex items-center text-lg"
              >
                <Undo2 className="mr-2" />
                Quay Lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
