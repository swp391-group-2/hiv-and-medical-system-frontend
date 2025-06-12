import React from "react";

const FilterBar = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Tìm kiếm tên hoặc mã bệnh nhân..."
        className="w-full max-w-md px-3 py-2 border rounded-lg shadow-sm"
      />
      <select className="ml-4 px-3 py-2 border rounded-lg">
        <option value="all">Tất cả</option>
        <option value="positive">HIV (+)</option>
        <option value="negative">HIV (-)</option>
      </select>
    </div>
  );
};

export default FilterBar;
