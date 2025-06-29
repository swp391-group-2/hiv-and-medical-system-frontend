import { Calendar, Eye, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface EducationCardProps {
  blogId: number;
  author: string;
  title: string;
  snippet: string;
  createdAt: string;
  urlImage: string;
}

function EducationCard({
  blogId,
  title,
  author,
  createdAt,
  snippet,
  urlImage,
}: EducationCardProps) {
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(`/education/${blogId}`);
  };
  return (
    <div>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 relative">
        <div className="h-1 bg-gradient-to-l to-primary from-blue-800"></div>

        <div className="p-5">
          <div className="rounded-t-lg overflow-hidden">
            <img
              className="h-[200px] w-full object-cover"
              loading="lazy"
              src="https://i.pinimg.com/736x/31/8b/68/318b6880b4b329ecc4d560af58c5101a.jpg"
              alt={urlImage}
            />
          </div>
          <h3 className="text-2xl mt-4 font-bold text-gray-900 mb-2 min-h-[4rem] line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="text-sm text-gray-500 mb-3 flex items-center justify-between space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span> {author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(createdAt).toLocaleString("vi")}</span>
            </div>
          </div>

          <p className="text-gray-600  mb-6 line-clamp-2 leading-relaxed">
            {snippet}
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={handleDetailClick}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-xl hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl group-hover:scale-105"
            >
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
