import React from "react";
import { Calendar, List } from "lucide-react";

interface ScheduleViewSwitcherProps {
  currentView: "list" | "calendar";
  onViewChange: (view: "list" | "calendar") => void;
}

const ScheduleViewSwitcher: React.FC<ScheduleViewSwitcherProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      <button
        onClick={() => onViewChange("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentView === "list"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <List size={16} />
        Danh sách
      </button>

      <button
        onClick={() => onViewChange("calendar")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentView === "calendar"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <Calendar size={16} />
        Lịch làm việc
      </button>
    </div>
  );
};

export default ScheduleViewSwitcher;
