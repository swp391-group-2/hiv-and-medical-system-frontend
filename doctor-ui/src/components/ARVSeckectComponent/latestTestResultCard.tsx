import type { LabResult } from "@/types/appointment";


interface Props {
  result: LabResult;
}
const LatestTestResultCard: React.FC<Props> = ({ result }) => {
  return (
    <div className="bg-green-50 p-4 rounded shadow text-green-900">
      <h2 className="text-lg font-semibold mb-2">Kết quả XN gần nhất</h2>

      <div className="bg-white text-green-800 p-3 rounded border-2 border-green-200 mb-2">
        <div>
          <p className="font-bold">{result.cd4}</p>
          <p className="text-sm">CD4 (cells/µL)</p>
        </div>
      </div>

      <div className="bg-white text-green-800 p-3 rounded border-2 border-green-200 mb-2">
        <div>
          <p className="font-bold">{result.viralLoad}</p>
          <p className="text-sm">Viral Load (copies/mL)</p>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-sm text-green-700 mt-2">Ngày XN: {result.date}</p>
      </div>
    </div>
  );
};

export default LatestTestResultCard;
