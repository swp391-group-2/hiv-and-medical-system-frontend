import type { PrescriptionItem } from "@/types/types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PresItem = ({ item }: { item: PrescriptionItem }) => {
  return (
    <AccordionItem
      value={`pres-item-${item.prescriptionItemId}`}
      className="rounded-lg overflow-visible m-2"
    >
      <AccordionTrigger className="flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-50">
        <span className="text-sm font-medium text-gray-800">
          Thuốc: {item.medication.name}
        </span>
      </AccordionTrigger>

      <AccordionContent className="rounded-lg px-4 py-3 bg-gray-50 space-y-2 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <span className="font-medium text-gray-600 w-24 shrink-0">
            Mô tả:
          </span>
          <span className="flex-1 whitespace-normal break-words">
            {item.medication.description}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600 w-24 shrink-0">Dạng:</span>
          <span className="flex-1 whitespace-normal break-words">
            {item.medication.dosageForm}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600 w-24 shrink-0">
            Liều lượng:
          </span>
          <span className="flex-1 whitespace-normal break-words">
            {item.dosage}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-gray-600 w-24 shrink-0">
            Tần suất:
          </span>
          <span className="flex-1 whitespace-normal break-words">
            {item.frequency}
          </span>
          <span className="font-medium text-gray-600 shrink-0">Trong:</span>
          <span className="flex-1 whitespace-normal break-words">
            {item.duration}
          </span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PresItem;
