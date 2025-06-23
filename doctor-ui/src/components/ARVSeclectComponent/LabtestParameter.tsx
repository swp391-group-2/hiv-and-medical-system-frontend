import React from "react";


const LabtestParameter: React.FC = () => {
  return (
    <div className="bg-blue-50 p-4 rounded shadow text-red-900">
      <h2 className="text-lg font-semibold mb-2">Giá trị tham chiếu XN</h2>
      
        <div className="bg-white text-red-800 p-3 rounded border-2 border-red-200 mb-2">
          <span className="font-bold">CD4 : </span>
          <span>500 - 1500</span>
        </div>
        <div className="bg-white text-red-800 p-3 rounded border-2 border-red-200 mb-2">
          <span className="font-bold">Viral Load:  </span>
          <span>  &lt;50</span>
        </div>
      
      <div className="text-xs text-blue-700 mt-2"></div>
    </div>
  );
};

export default LabtestParameter;
