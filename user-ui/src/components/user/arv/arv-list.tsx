import { Checkbox } from "../../ui/checkbox";

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
    <div className="text-gray-500 text-center w-full grid grid-cols-5 mt-5 mb-5 p-4">
      <span>Tên thuốc</span>
      <span>Liều uống</span>
      <span>Thời gian uống</span>
      <span>Đánh dấu đã uống</span>
      <span>Ghi chú</span>
    </div>
  );
};

export const ArvItem = ({ item }: { item: ArvInfoProps }) => {
  return (
    <ul className="w-full border border-gray-300 p-4 rounded">
      {item.meds.map((med: Medicine) => (
        <li
          key={med.id}
          className="w-full grid grid-cols-5 text-center items-center border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0"
        >
          <span>{med.name}</span>
          <span>{med.dosage}</span>
          <div className="flex flex-col gap-3">
            {med.time.map((takeAt, index) =>
              index === med.time.length - 1 ? (
                <span>{takeAt}</span>
              ) : (
                <span>{takeAt}</span>
              )
            )}
          </div>

          <div className="flex flex-col gap-3">
            {med.time.map(() => (
              <span>
                <Checkbox id={med.id} />
              </span>
            ))}
          </div>
          <span>{med.note}</span>
        </li>
      ))}
    </ul>
  );
};
