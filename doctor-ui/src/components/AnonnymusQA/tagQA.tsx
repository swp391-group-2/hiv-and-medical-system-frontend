import type { StatsItem } from "@/types/qaType";
import { MessageCircle, CheckCircle, ArrowRight, FileText } from "lucide-react";

interface StatsBoxProps {
  item: StatsItem;
}

const getIcon = (label: string) => {
  switch (label) {
    case "Chờ trả lời":
      return <MessageCircle className="w-6 h-6 text-orange-500" />;
    case "Đã trả lời":
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    case "Chuyển khoa":
      return <ArrowRight className="w-6 h-6 text-blue-500" />;
    case "Tổng câu hỏi":
      return <FileText className="w-6 h-6 text-purple-500" />;
    default:
      return <MessageCircle className="w-6 h-6 text-gray-500" />;
  }
};

const getColor = (label: string) => {
  switch (label) {
    case "Chờ trả lời":
      return "from-orange-50 to-orange-100 border-orange-200";
    case "Đã trả lời":
      return "from-green-50 to-green-100 border-green-200";
    case "Chuyển khoa":
      return "from-blue-50 to-blue-100 border-blue-200";
    case "Tổng câu hỏi":
      return "from-purple-50 to-purple-100 border-purple-200";
    default:
      return "from-gray-50 to-gray-100 border-gray-200";
  }
};

const StatsBox = ({ item }: StatsBoxProps) => {
  return (
    <div
      className={`bg-gradient-to-br ${getColor(
        item.label
      )} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full border`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getIcon(item.label)}
          <h3 className="text-sm font-medium text-gray-700">{item.label}</h3>
        </div>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900 mb-1">{item.count}</p>
        <p className="text-xs text-gray-500">{item.description}</p>
      </div>
    </div>
  );
};

export default StatsBox;
