import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArvLabels, ArvItem } from "@/components/user/arv-list";
import ArvCaution from "@/components/user/arv-caution";
import type { Medicine, ArvInfoProps } from "@/components/user/arv-list";
const meds = [
  {
    id: "M001",
    name: "Paracetamol",
    dosage: "1 vien/ngay",
    time: ["7:00"],
    note: "Uong sau khi an sang",
    checked: false,
  },
  {
    id: "M002",
    name: "Schesazuag",
    dosage: "1 vien/ngay",
    time: ["12:00"],
    note: "Uong sau khi an trua",
    checked: false,
  },
  {
    id: "M003",
    name: "Hepzitaega",
    dosage: "2 vien/ngay",
    time: ["7:00", "19:00"],
    note: "Uong sau khi an sang va sau khi an toi",
    checked: false,
  },
  {
    id: "M004",
    name: "Veradage",
    dosage: "2 vien/ngay",
    time: ["12:00", "19:00"],
    note: "Uong sau khi an trua va sau khi an toi",
    checked: false,
  },
] as Medicine[];

const arvInfoData = {
  id: "A001",
  name: "ABC/XYZ",
  meds: meds,
} as ArvInfoProps;

const arvCautions = [
  "Uống thuốc đúng giờ và đúng liều lượng theo chỉ định của bác sĩ.",
  "Không bỏ liều hoặc tự ý ngưng thuốc khi chưa có chỉ định của bác sĩ.",
  "Nếu quên uống thuốc, hãy uống ngay khi nhớ ra, trừ khi đã gần đến liều tiếp theo.",
  "Liên hệ bác sĩ nếu gặp bất kỳ tác dụng phụ nào.",
];

const Arv = () => {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <section className="w-full mt-7 mr-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Phác đồ điều trị: {arvInfoData.name}
          </CardTitle>
          <CardDescription className="text-xl">
            Ngày {formattedDate}: Danh sách thuốc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArvLabels />
          <ArvItem item={arvInfoData} />
        </CardContent>
      </Card>
      <ArvCaution list={arvCautions} />
    </section>
  );
};

export default Arv;
