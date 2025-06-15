import type { Alerts } from "@/types/type";

const AlertsCard = ({ alerts }: { alerts: Alerts }) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold">Cảnh báo</h2>

      <div className="bg-red-50 text-red-800 p-3 rounded">
        <p className="font-medium">Dị ứng thuốc</p>
        <p className="text-sm">{alerts.allergy}</p>
      </div>

      <div className="bg-yellow-50 text-yellow-800 p-3 rounded">
        <p className="font-medium">Bệnh kèm theo</p>
        <p className="text-sm">{alerts.comorbid}</p>
      </div>
    </div>
  );
};

export default AlertsCard;
