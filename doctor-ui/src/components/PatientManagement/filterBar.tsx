import React from "react";

interface Props {
  searchTerm: string;
  filterType: string;
  onSearchChange: (value: string) => void;
  onFilterTypeChange: (value: string) => void;
}

const FilterBar: React.FC<Props> = ({
  searchTerm,
  filterType,
  onSearchChange,
  onFilterTypeChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder={
  filterType === "byDate"
    ? "Nhập ngày khám (yyyy-mm-dd)"
    : filterType === "bySlot"
    ? "Nhập slot khám (số)"
    : filterType === "byAppointmentCode"
    ? "Nhập mã buổi khám..."
    : "Tìm kiếm tên bệnh nhân..."
}

        className="w-full max-w-md px-3 py-2 border rounded-lg shadow-sm"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
   <select
  className="ml-4 px-3 py-2 border rounded-lg"
  value={filterType}
  onChange={(e) => onFilterTypeChange(e.target.value)}
>
  <option value="all">Tất cả</option>
  <option value="byDate">Lọc theo ngày</option>
  <option value="byName">Lọc theo tên</option>
  <option value="bySlot">Lọc theo slot khám</option> 
    <option value="byAppointmentCode">Lọc theo mã buổi khám</option>

</select>


    </div>
  );
};

export default FilterBar;
