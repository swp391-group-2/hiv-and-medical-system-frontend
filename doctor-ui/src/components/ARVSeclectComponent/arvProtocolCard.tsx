import type { patientPrescription } from "@/types/prescription";

const PrescriptionCard = ({
  prescription,
  onClick,
  selected,
}: {
  prescription: patientPrescription;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <div
      className={`p-4 rounded shadow cursor-pointer transition-colors duration-200 ${
        selected
          ? "bg-blue-100 border-blue-500 border-2"
          : "bg-white hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <h3 className="text-md font-semibold">{prescription.name}</h3>
      <p className="text-sm mb-2">
        Chống chỉ định: {prescription.contraindication}
      </p>
      <p className="text-sm mb-2">Tác dụng phụ: {prescription.sideEffect}</p>
    </div>
  );
};

export default PrescriptionCard;
