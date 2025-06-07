import Hero from "@/components/hero";
import HomeDoctors from "@/components/home-doctors";
import HomeEducation from "@/components/home-education";
import HomeInfo from "@/components/home-info";
import HomeService from "@/components/home-service";

function Home() {
  return (
    <div>
      <Hero />
      <div className="p-5">
        <HomeInfo />
      </div>
      <div className="p-10 border-t border-primary/20 bg-gray-100/70">
        <HomeService />
      </div>
      <div className="p-10 ">
        <HomeEducation />
      </div>
      <div className="p-10 ">
        <HomeDoctors />
      </div>
    </div>
  );
}

export default Home;
