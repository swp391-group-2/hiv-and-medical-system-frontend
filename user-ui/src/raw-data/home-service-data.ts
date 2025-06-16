import type { ServiceCardProps } from "@/components/service-card";
import { BriefcaseMedical, FlaskConical } from "lucide-react";

export const services: ServiceCardProps[] = [
  {
    title: "Xét Nghiệm Sàng Lọc.",
    desc: "Xét nghiệm sàng lọc HIV và các bệnh lý khác. Đây là bước đầu tiên trong quy trình chẩn đoán.",
    icon: FlaskConical,
    href: "/screening",
    imgUrl: "/images/screeningtest.jpg",
  },
  {
    title: "Xét Nghiệm Khẳng Định.",
    desc: "Xét nghiệm khẳng định HIV, CD4, tải lượng virus và các xét nghiệm chuyên sâu khác.",
    icon: FlaskConical,
    href: "/confirmation",
    imgUrl: "/images/confirmtest.jpg",
  },
  {
    title: "Khám và Điều Trị HIV",
    desc: "Dịch vụ khám bệnh, tư vấn, chẩn đoán và điều trị cho bệnh nhân.",
    icon: BriefcaseMedical,
    href: "/consultation/doctors",
    imgUrl: "/images/hivapointment.jpg",
  },
];
