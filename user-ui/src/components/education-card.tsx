import { Eye } from "lucide-react";
import { Button } from "./ui/button";

interface EducationCardProps {
  title: string;
  desc: string;
}

function EducationCard({ title, desc }: EducationCardProps) {
  return (
    <div>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 relative">
        <div className="h-1 bg-gradient-to-l to-primary from-blue-800"></div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {desc}
          </p>

          <div className="flex space-x-3">
            <Button className="flex-1 bg-primary text-white py-3 px-6 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl group-hover:scale-105">
              <Eye className="h-5 w-5 mr-2" />
              Đọc ngay
            </Button>
          </div>
        </div>

        <div className="absolute inset-0  from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default EducationCard;
