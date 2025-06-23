import type { Appointment } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PresItem from "./prescription-item";
import { usePrescription } from "@/api/appointments";

const Prescription = ({ appt }: { appt: Appointment }) => {
  if (
    appt.patientPrescription !== null &&
    appt.patientPrescription !== undefined
  ) {
    const { data: defaultPrescription, error } = usePrescription(
      appt.patientPrescription.prescriptionDefaultId
    );
    return (
      <div className="space-y-4 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          Phác đồ điều trị
        </h2>
        <>
          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Tên phác đồ
            </span>
            <span className="truncate text-gray-900">
              {appt.patientPrescription.prescriptionDefaultName}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Chỉ dẫn uống
            </span>
            <span className="truncate text-gray-900">
              {appt.patientPrescription.note}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Uống trong:
            </span>
            <span className="truncate text-gray-900">
              {appt.patientPrescription.duration} ngày
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Chống chỉ định
            </span>
            <span className="truncate text-gray-900">
              {defaultPrescription?.contraindication}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-medium text-gray-600 w-40 shrink-0">
              Tác dụng phụ
            </span>
            <span className="truncate text-gray-900">
              {defaultPrescription?.sideEffect}
            </span>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="outer-1">
              <AccordionTrigger className="text-sm font-medium text-red-600 hover:underline">
                Xem chi tiết toa thuốc
              </AccordionTrigger>
              <AccordionContent className="mt-2">
                <Accordion type="single" collapsible>
                  {appt.patientPrescription.patientPrescriptionItems.map(
                    (item) => (
                      <PresItem key={item.id} item={item} />
                    )
                  )}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      </div>
    );
  } else {
    return (
      <div className="text-2xl text-center text-gray-500 italic">
        Đang chờ phác đồ
      </div>
    );
  }
};

export default Prescription;
