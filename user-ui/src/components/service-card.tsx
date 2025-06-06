import { FlaskConical } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function ServiceCard() {
  return (
    <div className="p-5 shadow-lg shadow-gray-700 rounded-2xl group ">
      <div className="relative overflow-hidden rounded-t-2xl ">
        <img
          src="https://images.unsplash.com/photo-1745894118353-88e64617e064?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="img"
          className="w-full group-hover:scale-110 group-hover:blur-[2px] transition-all duration-400 transform"
        />

        <div className="absolute bottom-3 left-0 right-0 px-4 ">
          <Link to={"/"}>
            <Button className="border opacity-0 bg-transparent group-hover:backdrop-blur-md group-hover:opacity-100   text-white font-bold w-full py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              More Info
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2.5 hover:text-primary ">
          <FlaskConical className="transition-all duration-500" />
          <h3 className="font-bold text-2xl  transition-all duration-300  ">
            <Link to="/">Xét Nghiệm Sàng Lọc</Link>
          </h3>
        </div>
        <p className="mt-1.5 text-gray-500">
          Xét nghiệm sàng lọc HIV và các bệnh lý khác. Đây là bước đầu tiên
          trong quy trình chẩn đoán.
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;
