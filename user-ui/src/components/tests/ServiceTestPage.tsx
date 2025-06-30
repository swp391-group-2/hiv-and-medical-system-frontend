// src/pages/services/ServiceTestPage.tsx
import { useEffect } from "react";
import TestHeader from "./TestHeader";
import InfoCardTest from "./InfoCardTest";
import MainContentLeft from "./MainContentLeft";
import MainContentRight from "./MainContentRight";
import useBookingStore from "@/stores/booking.store";

interface ServiceTestProps {
  title: string;
  price: string;
  image: string;
  Span: string[];

  resultTime: string;
  notes: string[];
  testPurposes: string[];
  targetAudiences: string[];
  sampleType: string;
  resultDuration: string;
  fastingRequired: string;
  methods?: string[];
  resultDurationEx?: string[];
}

const ServiceTestPage = (props: ServiceTestProps) => {
  const reset = useBookingStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <TestHeader
        title={props.title}
        price={props.price}
        image={props.image}
        resultTime={props.resultTime}
        notes={props.notes}
      />

      <InfoCardTest Span={props.Span} />

      <div className="flex flex-col lg:flex-row gap-8 border  rounded-xl bg-gray-50 p-6">
        <MainContentLeft
          testPurposes={props.testPurposes}
          targetAudiences={props.targetAudiences}
          sampleType={props.sampleType}
          fastingRequired={props.fastingRequired}
          resultTime={props.resultDuration}
          methods={props.methods}
          resultDurationEx={props.resultDurationEx}
        />
        <MainContentRight price={props.price} image={props.image} />
      </div>
    </div>
  );
};

export default ServiceTestPage;
