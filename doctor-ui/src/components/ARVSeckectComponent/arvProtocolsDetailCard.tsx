import type { Prescription } from "@/types/prescription";

const PrescriptionDetailCard = ({
  prescription,
}: {
  prescription: Prescription | null;
}) => {
  if (!prescription) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow text-gray-500">
        Click vào một phác đồ để xem chi tiết
      </div>
    );
  }

  return (
    <div className="bg-blue-100 border-blue-500 border-2 border-dashed p-4 rounded shadow text-blue-900">
      <h2 className="text-lg font-semibold mb-2">{prescription.name}</h2>
      <p className="text-sm mb-2">
        Chống chỉ định: {prescription.contraindication}
      </p>
      <p className="text-sm mb-2">Tác dụng phụ: {prescription.sideEffect}</p>
      <p className="text-sm mb-2">Hướng dẫn: {prescription.instructions}</p>
       <p className="text-sm mb-2">Dạng viên: {prescription.dosageForm}</p>
      <div className="mt-3">
        <p className="font-medium mb-1">Chi tiết thuốc:</p>
        {prescription.prescriptionItems.map((item, index) => (
          <div key={index} className="mb-1 text-sm ">
            <p>
              <strong>Thuốc:</strong> {item.medication.name}
            </p>
            <p>
              <strong>Liều dùng:</strong> {item.dosage}
            </p>
            <p>
              <strong>Tần suất:</strong> {item.frequency}
            </p>
            <p>
              <strong>Thời gian:</strong> {item.duration}
            </p>
            {/* <p>
              <strong>Dạng bào chế:</strong> {item.medication.dosageForm}
               <strong>Dạng viên:</strong> {item.medication.dosageForm}
            </p> */}
            <p>
              <strong>Hàm lượng:</strong> {item.medication.strength}
            </p>
            <hr className="my-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionDetailCard;
