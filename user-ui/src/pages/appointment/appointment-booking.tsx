import serviceApi from "@/apis/service.api";
import MedicalFacilityInfo from "@/components/appointmenBooking/medical-facility-info";
import TimeSlotSelectorConsultation from "@/components/appointmenBooking/time-slot-selector-consultation";
import TimeSlotSelectorTest from "@/components/appointmenBooking/time-slot-selector-test";
import WeekCalendar from "@/components/appointmenBooking/week-calender";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildRoute } from "@/constants/appRoutes";
import useBookingStore from "@/stores/booking.store";
import type {
  ScheduleSlot,
  TestScheduleSlotEntry,
} from "@/types/schedule.type";
import { useQuery } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const setScheduleSlot = useBookingStore((state) => state.setScheduleSlot);
  const setLabTestSlot = useBookingStore((state) => state.setLabTestSlot);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSelectScheduleSlot = (time: string, slot: ScheduleSlot) => {
    setScheduleSlot(slot);
    setSelectedTime(time);
  };

  const handleSelectLabTestSlot = (
    time: string,
    slot: TestScheduleSlotEntry
  ) => {
    setLabTestSlot(slot);
    setSelectedTime(time);
  };

  const goToPrevWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
    setSelectedDate(null);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
    setSelectedDate(null);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // const location = useLocation();
  const { serviceType, doctorId } = useParams<{
    serviceType: string;
    doctorId: string;
  }>();

  const handleBooking = () => {
    if (doctorId) {
      navigate(buildRoute.selectProfileBookingConsultation(doctorId));
    } else if (serviceType) {
      navigate(buildRoute.selectProfileBooking(serviceType));
    }
  };

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", serviceType],
    queryFn: async () => {
      if (!serviceType) {
        throw new Error("Service type is required");
      }
      const response = await serviceApi
        .getServicesByType(serviceType)
        .then((res) => res.data);
      return response;
    },
    enabled: !!serviceType,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="error">Failed to load service data</div>
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto min-h-screen">
        <div className="mt-7">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MedicalFacilityInfo service={service} />
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
                      {doctorId ? (
                        <TimeSlotSelectorConsultation
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onTimeSelect={handleSelectScheduleSlot}
                        />
                      ) : (
                        <TimeSlotSelectorTest
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onTimeSelect={handleSelectLabTestSlot}
                        />
                      )}
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
