import type { LatestTestResult } from "@/pages/ARVSelect/type";

const LatestTestResultCard = ({ result }: { result: LatestTestResult }) => {
  return (
    <div className="bg-green-50 p-4 rounded shadow text-green-900">
      <h2 className="text-lg font-semibold mb-2">Kết quả XN gần nhất</h2>
      <div className="bg-white text-green-800 p-3 rounded border-2 border-green-200 mb-2">
        <p>
          {" "}
          <p className="font-bold">{result.cd4}</p>
          <p className="text-sm">CD4: cells/µL</p>
        </p>
      </div>
      <div className="bg-white text-green-800 p-3 rounded border-2 border-green-200 mb-2">
        
         <p>
          {" "}
          <p className="font-bold">{result.viralLoad}</p>
          <p className="text-sm">Viral Load</p>
        </p>
      </div>
      <div className="flex justify-center">
         <p className="text-sm text-green-700 mt-2">Ngày XN: {result.date}</p>
      </div>
    </div>
  );
};

export default LatestTestResultCard;
