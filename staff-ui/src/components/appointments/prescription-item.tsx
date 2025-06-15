import type { PrescriptionItem } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PresItem = ({ item }: { item: PrescriptionItem }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <AccordionItem value={`pres-item-${item.prescriptionItemId}`}>
        <AccordionTrigger className="flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-50">
          <span className="text-sm font-medium text-gray-800 truncate">
            Thuốc: {item.medication.name}
          </span>
        </AccordionTrigger>

        <AccordionContent className="px-4 py-3 bg-gray-50 space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="font-medium text-gray-600 w-24 shrink-0">
              Mô tả:
            </span>
            <span className="truncate">{item.medication.description}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-24 shrink-0">
              Dạng:
            </span>
            <span className="truncate">{item.medication.dosageForm}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600 w-24 shrink-0">
              Liều lượng:
            </span>
            <span className="truncate">{item.dosage}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-600 w-24 shrink-0">
              Tần suất:
            </span>
            <span className="truncate">{item.frequency}</span>
            <span className="font-medium text-gray-600 shrink-0">Trong:</span>
            <span className="truncate">{item.duration}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PresItem;
