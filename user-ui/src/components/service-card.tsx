import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export interface ServiceCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  imgUrl: string;
  href: string;
}

function ServiceCard({ title, desc, href, icon, imgUrl }: ServiceCardProps) {
  const ServiceIcon = icon;
  return (
    <div className="p-5 group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 relative">
      <div className="relative overflow-hidden rounded-t-2xl  ">
        <Link to={href}>
          <img
            src={imgUrl}
            loading="lazy"
            alt="img"
            className="w-full group-hover:scale-110 transition-all duration-400 transform"
          />
        </Link>

        <div className="absolute bottom-3 left-0 right-0 px-4 "></div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2.5 group-hover:text-primary ">
          <h3 className="font-bold text-2xl  transition-all duration-300  ">
            <Link to={href}>{title}</Link>
          </h3>
          <ServiceIcon className="duration-300" />
        </div>
        <p className="mt-1.5 text-gray-500">{desc}</p>
      </div>
      <div className="mt-2.5">
        <Link to={href}>
          <Button className="font-bold text-lg w-full">
            Xem Thông Tin Chi Tiết
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
