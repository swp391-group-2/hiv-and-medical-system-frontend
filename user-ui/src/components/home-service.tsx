import { services } from "@/raw-data/home-service-data";
import ServiceCard from "./service-card";

function HomeService({
  homeServiceRef,
}: {
  homeServiceRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section ref={homeServiceRef}>
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
