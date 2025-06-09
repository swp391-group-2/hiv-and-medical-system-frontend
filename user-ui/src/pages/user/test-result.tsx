import type { TestRsListProps } from "@/components/user/result/test-rs-list";
import TestRsTabs from "@/components/user/result/test-rs-tabs";

export const sampleTestRsList1: TestRsListProps = {
  list: [
    {
      id: 1,
      type: "PCR",
      result: "Negative",
      time: "2025-06-08T09:30:00Z",
      note: "All gene targets undetected.",
    },
    {
      id: 2,
      type: "Antigen",
      result: "Positive",
      time: "2025-06-07T14:15:00Z",
      note: "Low viral load; confirm with PCR.",
    },
    {
      id: 3,
      type: "Antibody",
      result: "Inconclusive",
      time: "2025-06-06T11:00:00Z",
      note: "Retest advised after 1 week.",
    },
  ],
  viral: {
    date: "2025-06-08",
    load: "150 copies/mL",
    result: "Detected",
    note: "Above treatment threshold.",
  },
  cd4: {
    date: "2025-06-08",
    quantity: 580,
    percentage: 32,
    normal_threshold: "500–1,500 cells/mm³",
    note: "Within normal range.",
  },
};

export const sampleTestRsList2: TestRsListProps = {
  list: [
    {
      id: 4,
      type: "Blood Sugar",
      result: "5.4 mmol/L",
      time: "2025-06-05T08:00:00Z",
      note: "Fasting sample; normal.",
    },
    {
      id: 5,
      type: "Cholesterol",
      result: "High",
      time: "2025-06-04T16:45:00Z",
      note: "LDL elevated; dietary changes recommended.",
    },
  ],
  viral: {
    date: "2025-06-05",
    load: "Undetectable",
    result: "Undetected",
    note: "Below assay limit.",
  },
  cd4: {
    date: "2025-06-05",
    quantity: 450,
    percentage: 28,
    normal_threshold: "500–1,500 cells/mm³",
    note: "Slightly below normal; monitor.",
  },
};

const TestResult = () => {
  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl font-bold mb-5">Kết quả xét nghiệm</h1>
      <TestRsTabs scr={sampleTestRsList1} cfm={sampleTestRsList2} />
    </section>
  );
};

export default TestResult;
