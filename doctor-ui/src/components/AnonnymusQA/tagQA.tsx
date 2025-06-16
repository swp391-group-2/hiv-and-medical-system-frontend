import type { StatsItem } from "@/types/qaType";

interface StatsBoxProps {
  item: StatsItem;
}

const StatsBox = ({ item }: StatsBoxProps) => {
  return (
    <div className="bg-white rounded-md p-4 shadow-sm w-full sm:w-1/5 text-center border">
      <p className="text-sm text-gray-600">{item.label}</p>
      <p className="text-2xl font-bold">{item.count}</p>
      <p className="text-xs text-gray-400">{item.description}</p>
    </div>
  );
};

export default StatsBox;
