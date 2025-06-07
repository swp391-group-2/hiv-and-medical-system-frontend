import React from "react";

interface FinderBarEduProps {
  search: string;
  setSearch: (value: string) => void;
}

const FinderBarEdu: React.FC<FinderBarEduProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-0 flex justify-center items-center w-full">
      <input
        type="text"
        placeholder="Tìm bài viết giáo dục"
        className="border rounded-full px-4 py-2 md:w-180 shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FinderBarEdu;
