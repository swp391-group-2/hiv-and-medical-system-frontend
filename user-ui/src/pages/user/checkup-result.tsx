import CheckUpResultList from "@/components/user/result/checkup-rs-list";
import type { CheckUpRsItemProps } from "@/components/user/result/checkup-rs-item";
import type {
  CD4RsProps,
  ViralLoadRsProps,
} from "@/components/user/result/common";
const checkUpList: CheckUpRsItemProps[] = [
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

const emptyList: CheckUpRsItemProps[] = [];

const viralLoadResult: ViralLoadRsProps = {
  date: "2025-06-08",
  load: "32 copies/mL",
  result: "Có phát hiện",
  note: "Tiếp tục điều trị, hẹn tái khám sau 6 tháng.",
};

const cd4Result: CD4RsProps = {
  date: "2025-06-08",
  quantity: 480,
  percentage: 19,
  normal_threshold: "500-1500 cells/mm³",
  note: "Theo dõi thêm, khuyến cáo tiêm phòng đầy đủ.",
};

const CheckUpResult = () => {
  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl font-bold mb-5">Kết quả khám</h1>
      <CheckUpResultList
        list={checkUpList}
        viral={viralLoadResult}
        cd4={cd4Result}
      />
    </section>
  );
};

export default CheckUpResult;
