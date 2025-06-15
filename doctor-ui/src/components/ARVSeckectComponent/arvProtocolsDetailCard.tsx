import type { Protocol } from "@/pages/ARVSelect/type";



const ARVProtocolDetailCard = ({ protocol }: { protocol: Protocol | null }) => {
  if (!protocol) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow text-gray-500">
        Click vào một phác đồ để xem chi tiết
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow text-gray-900">
      <h2 className="text-lg font-semibold mb-2">{protocol.name}</h2>
      <p className="text-sm mb-2">Bậc: {protocol.level}</p>
      <div className="mb-2">
        <p className="font-medium">Thành phần thuốc:</p>
        {protocol.ingredients.map((ing, index) => (
          <p key={index} className="text-sm">{ing}</p>
        ))}
      </div>
      <div>
        <p className="font-medium">Ghi chú:</p>
        {protocol.notes.map((note, index) => (
          <p key={index} className="text-sm text-red-600">{note}</p>
        ))}
      </div>
    </div>
  );
};

export default ARVProtocolDetailCard;