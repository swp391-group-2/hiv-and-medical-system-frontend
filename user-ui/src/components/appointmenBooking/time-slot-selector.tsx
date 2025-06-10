interface TimeSlotSelectorProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlotSelector = ({
  selectedTime,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const timeSlots = [
    "07:00 - 07:30",
    "07:30 - 08:00",
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
  ];

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Buổi sáng</h3>
        <span className="text-sm text-gray-500">Đóng</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onTimeSelect(slot)}
            className={`
              px-4 py-3 rounded-lg border text-sm font-medium transition-colors
              ${
                selectedTime === slot
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
              }
            `}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
