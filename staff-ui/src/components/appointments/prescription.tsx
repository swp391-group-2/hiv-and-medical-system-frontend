import type { Appointment } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PresItem from "./prescription-item";

const Prescription = ({ appt }: { appt: Appointment }) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800">Phác đồ điều trị</h2>
      {appt.prescription !== null ? (
        <>
          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Tên phác đồ
            </span>
            <span className="truncate text-gray-900">
              {appt.prescription.name}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Chỉ dẫn uống
            </span>
            <span className="truncate text-gray-900">
              {appt.prescription.instructions}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Chống chỉ định
            </span>
            <span className="truncate text-gray-900">
              {appt.prescription.contraindication}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Tác dụng phụ
            </span>
            <span className="truncate text-gray-900">
              {appt.prescription.sideEffect}
            </span>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="outer-1">
              <AccordionTrigger className="text-sm font-medium text-red-600 hover:underline">
                Xem chi tiết toa thuốc
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-2">
                {appt.prescription.prescriptionItems.map((item) => (
                  <PresItem key={item.prescriptionItemId} item={item} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="text-2xl text-center text-gray-500 italic">
          Đang chờ phác đồ
        </div>
      )}
    </div>
  );
};

export default Prescription;
