interface TimeSlotSelectorProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlotSelector = ({
  selectedTime,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const allTimeSlots = [
    "07:00 - 07:30",
    "07:30 - 08:00",
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
  ];

  const morningSlots = allTimeSlots.filter((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = allTimeSlots.filter((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    return hour >= 12;
  });

  const sessions = [
    { title: "Buổi sáng", slots: morningSlots },
    { title: "Buổi chiều", slots: afternoonSlots },
  ];

  return (
    <div className="border-t pt-6">
      {sessions.map((session, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {session.title}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {session.slots.map((slot) => (
              <button
                key={slot}
                onClick={() => onTimeSelect(slot)}
                className={`
                  px-4 py-3 rounded-lg border text-sm font-medium transition-colors
                  ${
                    selectedTime === slot
                      ? "bg-primary text-white border-cyan-500"
                      : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
                  }
                `}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
