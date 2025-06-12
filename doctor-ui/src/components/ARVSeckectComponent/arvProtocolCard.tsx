import type { Protocol } from "@/pages/ARVSelect/type";



const ARVProtocolCard = ({ protocol, onClick }: { protocol: Protocol; onClick: () => void }) => {
  return (
    <div
      className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-md font-semibold">{protocol.name}</h3>
      <p className="text-sm mb-2">Bậc: {protocol.level}</p>
      <div className="text-xs text-gray-700">
        {protocol.ingredients.map((ing, index) => (
          <p key={index}>{ing}</p>
        ))}
      </div>
    </div>
  );
};

export default ARVProtocolCard;