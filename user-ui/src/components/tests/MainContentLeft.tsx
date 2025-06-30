interface MainContentLeftProps {
  testPurposes: string[];
  targetAudiences: string[];
  sampleType: string;
  fastingRequired: string;
  resultTime: string;
  methods?: string[];
  resultDurationEx?: string[];
}

const MainContentLeft = ({
  testPurposes,
  targetAudiences,
  sampleType,
  fastingRequired,
  resultTime,
  methods,
  resultDurationEx,
}: MainContentLeftProps) => {
  return (
    <div className="flex-1 space-y-8">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">
            Mục đích xét nghiệm
          </h3>
        </div>
        <div className="space-y-3">
          {testPurposes.map((purpose, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{purpose}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-800">
            Dành cho đối tượng nào
          </h3>
        </div>
        <div className="space-y-3">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{audience}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-purple-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="grid gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-semibold text-gray-800">Loại mẫu</h4>
            </div>
            <p className="text-gray-700 ml-6 bg-white rounded-lg p-3 border border-purple-100">
              {sampleType}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-semibold text-gray-800">
                Thời gian nhận kết quả
              </h4>
            </div>
            <p className="text-gray-700 ml-6 bg-white rounded-lg p-3 border border-orange-100">
              {resultTime}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-semibold text-gray-800">
                Có cần nhịn ăn trước khi xét nghiệm
              </h4>
            </div>
            <p className="text-gray-700 ml-6 bg-white rounded-lg p-3 border border-red-100">
              {fastingRequired}
            </p>
          </div>
        </div>
      </div>

      {methods &&
        resultDurationEx &&
        methods.length === resultDurationEx.length && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-200 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-bold text-gray-800">
                Các phương pháp xét nghiệm HIV
              </h3>
            </div>
            <div className="bg-white rounded-xl p-6 border border-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Xét nghiệm HIV sàng lọc:
              </h4>
              <div className="space-y-4">
                {methods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100 hover:shadow-md transition-all duration-200"
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mr-4 flex-shrink-0">
                      {resultDurationEx[index]}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MainContentLeft;
