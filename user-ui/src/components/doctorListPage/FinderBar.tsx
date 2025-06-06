import React from 'react'

interface FinderBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const FinderBar: React.FC<FinderBarProps> = ({ search, setSearch }) => {
  return (
     <div className="mb-6 justify-center items-center flex">
          <input
            type="text"
            placeholder="Tìm bác sĩ"
            className="border rounded-full px-4 py-2 w-full md:w-1/2 shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
  )
}

export default FinderBar