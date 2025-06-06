import { BriefcaseMedical, FlaskConical } from "lucide-react";
import ServiceCard, { type ServiceCardProps } from "./service-card";

const services: ServiceCardProps[] = [
  {
    title: "Xét Nghiệm Sàng Lọc.",
    desc: "Xét nghiệm sàng lọc HIV và các bệnh lý khác. Đây là bước đầu tiên trong quy trình chẩn đoán.",
    icon: FlaskConical,
    href: "/service/screeningtest",
    imgUrl: "/images/screeningtest.jpg",
  },
  {
    title: "Xét Nghiệm Khẳng Định.",
    desc: "Xét nghiệm khẳng định HIV, CD4, tải lượng virus và các xét nghiệm chuyên sâu khác.",
    icon: FlaskConical,
    href: "/service/confirmatorytest",
    imgUrl: "/images/confirmtest.jpg",
  },
  {
    title: "Khám và Điều Trị HIV",
    desc: "Dịch vụ khám bệnh, tư vấn, chẩn đoán và điều trị cho bệnh nhân.",
    icon: BriefcaseMedical,
    href: "/service/treatment",
    imgUrl: "/images/hivapointment.jpg",
  },
];

function HomeService() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-center text-4xl font-bold  mb-4">
            Các Dịch Vụ Của Chúng Tôi
          </h2>
          <p className="inline-block w-[50%] text-lg text-gray-400">
            Vì sức khỏe của bạn quan trọng với chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-12 gap-8 mt-8">
          {services.map((service, index) => (
            <div className="col-span-4" key={index}>
              <ServiceCard
                title={service.title}
                desc={service.desc}
                icon={service.icon}
                href={service.href}
                imgUrl={service.imgUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeService;
