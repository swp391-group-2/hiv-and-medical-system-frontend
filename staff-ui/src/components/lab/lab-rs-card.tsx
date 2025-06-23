import type { Appointment } from "@/types/types";
import { ResultNumericForm, ResultTextForm } from "./lab-rs-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStd } from "@/lib/utils";

const LabRsCard = ({ appt }: { appt: Appointment }) => {
  const isConsultation = appt.serviceType === "CONSULTATION";
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>
          Mã số: <span className="font-semibold">{appt.appointmentCode}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Mẫu xét nghiệm</span>
            {appt.serviceType === "CONSULTATION" ? (
              <div className="flex flex-col font-medium">
                <span>Mẫu CD4: {appt.labSample.sampleCodeCD4}</span>
                <span>Mẫu virus: {appt.labSample.sampleCodeVirus}</span>
              </div>
            ) : (
              <span className="font-medium">{appt.labSample.sampleType}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Thu thập lúc</span>
            <span className="font-medium">
              {formatStd(appt.labSample.collectedAt)}
            </span>
          </div>
        </div>
        {isConsultation ? (
          <ResultNumericForm appt={appt} />
        ) : (
          <ResultTextForm appt={appt} />
        )}
      </CardContent>
    </Card>
  );
};

export default LabRsCard;
