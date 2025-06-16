import DoctorHero from "@/components/doctorListPage/doctor-hero";

import FinderBar from "@/components/doctorListPage/FinderBar";

import { useState } from "react";
import DoctorList from "@/components/doctorListPage/doctor-list";

const ServiceDoctorList = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <DoctorHero />
      <div className="container mx-auto min-h-screen">
        <main className="px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6 tracking-tight">
            Đặt khám bác sĩ
          </h1>
          <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
          <div className="flex flex-row gap-4 mb-4">
            <FinderBar search={search} setSearch={setSearch} />
            {/* <SortDoctorSelect
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            /> */}
          </div>
          <DoctorList />
        </main>
      </div>
    </div>
  );
};

export default ServiceDoctorList;
