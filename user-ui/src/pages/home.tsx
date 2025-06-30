import Hero from "@/components/hero";
import HomeDoctors from "@/components/home-doctors";
import HomeEducation from "@/components/home-education";
import HomeInfo from "@/components/home-info";
import HomeService from "@/components/home-service";
import { useRef } from "react";

function Home() {
  const homeServiceRef = useRef<HTMLDivElement>(null);
  const scrollToHomeService = () => {
    if (homeServiceRef.current) {
      homeServiceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div>
      <Hero scrollToHomeService={scrollToHomeService} />
      <div className="p-5">
        <HomeInfo />
      </div>
      <div className="p-10 border-t border-primary/20 bg-gray-100/70">
        <HomeService homeServiceRef={homeServiceRef} />
      </div>
      <div className="p-10 ">
        <HomeEducation />
      </div>
      <div className="p-10 bg-gray-100">
        <HomeDoctors />
      </div>
    </div>
  );
}

export default Home;
