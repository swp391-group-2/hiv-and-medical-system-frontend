import type { Protocol } from "@/pages/ARVSeclect/type";
import ARVProtocolCard from "./arvProtocolCard";


const ARVProtocolsSection = ({
  protocols,
  onSelect,
}: {
  protocols: Protocol[];
  onSelect: (protocol: Protocol) => void;
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Danh sách phác đồ ARV</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {protocols.map((protocol) => (
          <ARVProtocolCard
            key={protocol.id}
            protocol={protocol}
            onClick={() => onSelect(protocol)}
          />
        ))}
      </div>
    </div>
  );
};

export default ARVProtocolsSection;
