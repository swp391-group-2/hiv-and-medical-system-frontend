import { Checkbox } from "../ui/checkbox";
import { Clock } from "lucide-react";

export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  time: string[];
  note: string;
  checked: boolean;
};
export type ArvInfoProps = {
  id: string;
  name: string;
  meds: Medicine[];
};

export const ArvLabels = () => {
  return (
    <div className="text-gray-500 w-full grid grid-cols-5 mt-5 mb-5">
      <span>Tên thuốc</span>
      <span>Liều uống</span>
      <span>
        Thời gian uống <Clock />
      </span>
      <span>Ghi chú</span>
      <span>{""}</span>
    </div>
  );
};

export const ArvItem = ({ item }: { item: ArvInfoProps }) => {
  return (
    <ul className="w-full border border-gray-300 p-4 rounded">
      {item.meds.map((med: Medicine) => (
        <li className="w-full grid grid-cols-5 border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
          <span>{med.name}</span>
          <span>{med.dosage}</span>
          <span>
            {med.time.map((takeAt, index) =>
              index === med.time.length - 1 ? takeAt : takeAt + ", "
            )}
          </span>
          <span>{med.note}</span>
          <span>
            <Checkbox id={med.id} /> {med.checked ? "Đã uống" : "Chưa uống"}
          </span>
        </li>
      ))}
    </ul>
  );
};
