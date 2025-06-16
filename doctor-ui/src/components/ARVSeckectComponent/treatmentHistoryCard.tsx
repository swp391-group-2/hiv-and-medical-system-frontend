import type { TreatmentHistory } from "@/types/type";

const TreatmentHistoryCard = ({ history }: { history: TreatmentHistory }) => {
  return (
    <div className="bg-purple-50 p-4 rounded shadow text-purple-900">
      <h2 className="text-lg font-semibold mb-2">Lịch sử điều trị</h2>
      <p>Phác đồ: {history.protocol}</p>
      <p>
        Trạng thái:{" "}
        <span
          className={
            history.status.includes("Ngừng") ? "text-red-600" : "text-green-600"
          }
        >
          {history.status}
        </span>
      </p>
      <p>Thời gian: {history.time}</p>
      <p>Thời lượng: {history.duration}</p>
      <p>Ghi chú: {history.notes}</p>
    </div>
  );
};

export default TreatmentHistoryCard;
