import React from 'react';

type Props = {
  currentTab: 'today' | 'upcoming';
  onTabChange: (tab: 'today' | 'upcoming') => void;
};

const TabSwitcher: React.FC<Props> = ({ currentTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-4 py-2 rounded ${currentTab === 'today' ? 'bg-black text-white' : 'bg-gray-200'}`}
        onClick={() => onTabChange('today')}
      >
        Hôm nay
      </button>
      <button
        className={`px-4 py-2 rounded ${currentTab === 'upcoming' ? 'bg-black text-white' : 'bg-gray-200'}`}
        onClick={() => onTabChange('upcoming')}
      >
        Sắp tới
      </button>
    </div>
  );
};

export default TabSwitcher;
