import React from "react";

interface MainContentLeftProps {
  testPurposes: string[];
  targetAudiences: string[];
  sampleType: string;
  fastingRequired: string;
  resultTime: string;
  methods?: string[]; // Thêm prop mới (tùy chọn)
  resultDurationEx?: string[]; // Thêm prop mới (tùy chọn)
}

const MainContentLeft: React.FC<MainContentLeftProps> = ({
  testPurposes,
  targetAudiences,
  sampleType,
  fastingRequired,
  resultTime,
  methods,
  resultDurationEx,
}) => {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Mục đích xét nghiệm
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          {testPurposes.map((purpose, index) => (
            <li key={index}>{purpose}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Dành cho đối tượng nào
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          {targetAudiences.map((audience, index) => (
            <li key={index}>{audience}</li>
          ))}
        </ul>
      </div>
      {/* Chỉ hiện khi có prop methods */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <h3 className="text-lg font-semibold text-green-600">Loại mẫu</h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>{sampleType}</li>
        </ul>

        <h3 className="text-lg font-semibold text-green-600">
          Thời gian nhận kết quả
        </h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>{resultTime}</li>
        </ul>

        <h3 className="text-lg font-semibold text-green-600">
          Có cần nhịn ăn trước khi xét nghiệm
        </h3>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>{fastingRequired}</li>
        </ul>
      </div>{" "}
      {methods &&
        resultDurationEx &&
        methods.length === resultDurationEx.length && (
          <div className="bg-blue-50 rounded-xl shadow p-6 mt-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Các phương pháp xét nghiệm HIV
            </h3>
            <h4 className="text-base font-medium text-gray-800 mb-2">
              Xét nghiệm HIV sàng lọc:
            </h4>
            <ul className="list-disc list-inside text-gray-800">
              {methods.map((method, index) => (
                <li key={index}>
                  <span className="text-blue-600 font-medium">
                    {resultDurationEx[index]}
                  </span>
                  : {method}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default MainContentLeft;
