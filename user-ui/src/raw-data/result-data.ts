import type { TestRsListProps } from "@/components/user/result/test-rs-list";
import type { CheckUpRsItemProps } from "@/components/user/result/checkup-rs-item";
import type {
  CD4RsProps,
  ViralLoadRsProps,
} from "@/components/user/result/common";
export const checkUpList: CheckUpRsItemProps[] = [
  {
    id: 1,
    doctor: "Dr. John Smith",
    arv: "Tenofovir, Lamivudine, Efavirenz",
    time: "2025-06-08 09:30",
    note: "Continue current regimen and monitor liver function.",
  },
  {
    id: 2,
    doctor: "Dr. Emily Nguyen",
    arv: "Zidovudine, Lamivudine, Nevirapine",
    time: "2025-06-08 10:45",
    note: "Patient reported mild headache, advised rest.",
  },
  {
    id: 3,
    doctor: "Dr. Michael Tran",
    arv: "Dolutegravir, Lamivudine, Tenofovir",
    time: "2025-06-08 13:15",
    note: "Routine follow-up, no new symptoms.",
  },
  {
    id: 4,
    doctor: "Dr. Sarah Lee",
    arv: "Abacavir, Lamivudine, Efavirenz",
    time: "2025-06-08 15:00",
    note: "Advised to avoid sharing needles.",
  },
];

//const emptyList: CheckUpRsItemProps[] = [];

export const viralLoadResult: ViralLoadRsProps = {
  date: "2025-06-08",
  load: "32 copies/mL",
  result: "Có phát hiện",
  note: "Tiếp tục điều trị, hẹn tái khám sau 6 tháng.",
};

export const cd4Result: CD4RsProps = {
  date: "2025-06-08",
  quantity: 480,
  percentage: 19,
  normal_threshold: "500-1500 cells/mm³",
  note: "Theo dõi thêm, khuyến cáo tiêm phòng đầy đủ.",
};

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
