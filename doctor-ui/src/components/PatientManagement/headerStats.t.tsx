import React from "react";

interface HeaderStatsProps {
  totalPatients: number;
  totalTests: number;
  testsLast30Days: number;
}

const HeaderStats: React.FC<HeaderStatsProps> = ({
  totalPatients,
  totalTests,
  testsLast30Days
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow border">
        <div className="text-gray-500 text-sm">Tổng bệnh nhân</div>
        <div className="text-blue-600 font-bold text-2xl">{totalPatients}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border">
        <div className="text-gray-500 text-sm">Tổng xét nghiệm</div>
        <div className="text-green-600 font-bold text-2xl">{totalTests}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border">
        <div className="text-gray-500 text-sm">30 ngày qua</div>
        <div className="text-purple-600 font-bold text-2xl">{testsLast30Days}</div>
      </div>
    </div>
  );
};

export default HeaderStats;
