import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArvLabels, ArvItem } from "@/components/user/arv/arv-list";
import ArvCaution from "@/components/user/arv/arv-caution";
import { arvCautions, arvInfoData } from "@/raw-data/arv-data";

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
