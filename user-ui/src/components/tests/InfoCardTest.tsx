import { CalendarCheck, ShieldCheck, Zap } from "lucide-react";
import React from "react";
interface InfoCardTestProps {
  Span: string[];

}
const InfoCardTest: React.FC<InfoCardTestProps> = ({
  Span, 
})  => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
        <span className="text-xl">
          <Zap />
        </span>
        <span>{Span[0]}</span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
        <span className="text-xl">
          {" "}
          <CalendarCheck />
        </span>
        <span>
         {Span[1]}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
        <span className="text-xl">
          <ShieldCheck />
        </span>
        <span>
            {Span[2]}
        </span>
      </div>
    </div>
  );
};

export default InfoCardTest;
