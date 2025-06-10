import React from "react";

interface FinderBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const FinderBar: React.FC<FinderBarProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-0 flex justify-center items-center w-full">
      <input
        type="text"
        placeholder="Tìm bác sĩ"
        className="border rounded-2xl px-4 py-2 md:w-300 shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FinderBar;
