// src/components/TopHeader.tsx
import React from 'react';

const TopHeaderPending = () => {
  return (
    <div className="mb-6 flex space-x-4">
      <div className="flex-1 bg-blue-50 border border-blue-300 rounded p-4 text-center">
        <div className="text-sm">Tổng chờ</div>
        <div className="text-2xl font-bold text-blue-600">4</div>
      </div>
      <div className="flex-1 bg-red-50 border border-red-300 rounded p-4 text-center">
        <div className="text-sm">Khẩn cấp</div>
        <div className="text-2xl font-bold text-red-600">1</div>
      </div>
      <div className="flex-1 bg-green-50 border border-green-300 rounded p-4 text-center">
        <div className="text-sm">Bình thường</div>
        <div className="text-2xl font-bold text-green-600">3</div>
      </div>
    </div>
  );
};

export default TopHeaderPending;
