import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArvLabels, ArvItem } from "@/components/user/arv-list";
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

const Arv = () => {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <section className="w-full mt-7">
      <Card>
        <CardHeader>
          <CardTitle>Phác đồ điều trị: {arvInfoData.name}</CardTitle>
          <CardDescription>
            Ngày {formattedDate}: Danh sách thuốc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArvLabels />
          <ArvItem item={arvInfoData} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Arv;
