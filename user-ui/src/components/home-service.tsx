import ServiceCard from "./service-card";

function HomeService() {
  return (
    <section>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold text-primary mb-8">
          Dịch Vụ
        </h1>
        <div className="grid grid-cols-12 gap-8 ">
          <div className="col-span-4">
            <ServiceCard />
          </div>
          <div className="col-span-4">
            <ServiceCard />
          </div>
          <div className="col-span-4">
            <ServiceCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeService;
