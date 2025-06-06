import Hero from "@/components/hero";
import HomeInfo from "@/components/home-info";
import HomeService from "@/components/home-service";

function Home() {
  return (
    <div>
      <Hero />
      <div className="p-5">
        <HomeInfo />
      </div>
      <div className="pt-10 border-t border-primary/20 ">
        <HomeService />
      </div>
    </div>
  );
}

export default Home;
