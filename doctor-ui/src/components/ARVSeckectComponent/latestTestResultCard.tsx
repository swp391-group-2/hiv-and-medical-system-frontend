import type { LatestTestResult } from "@/pages/ARVSelect/type";



const LatestTestResultCard = ({ result }: { result: LatestTestResult }) => {
  return (
    <div className="bg-green-50 p-4 rounded shadow text-green-900">
      <h2 className="text-lg font-semibold mb-2">Kết quả XN gần nhất</h2>
      <p>CD4: {result.cd4} cells/µL</p>
      <p>Viral Load: {result.viralLoad}</p>
      <p className="text-sm text-green-700 mt-2">Ngày XN: {result.date}</p>
    </div>
  );
};

export default LatestTestResultCard;