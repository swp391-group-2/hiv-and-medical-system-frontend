import { Plus, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constants/appRoutes";

function ProfileMissing() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateProfile = () => {
    navigate(AppRoutes.USER_PROFILE, { state: { path: location.pathname } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-lg">
      <div className="relative mb-8">
        <div className="w-48 h-60 bg-white rounded-lg shadow-lg border-2 border-gray-200 relative">
          <div className="p-6 space-y-3">
            <div className="h-3 bg-blue-200 rounded w-3/4"></div>
            <div className="h-3 bg-blue-200 rounded w-1/2"></div>
            <div className="h-3 bg-blue-200 rounded w-2/3"></div>
            <div className="h-3 bg-blue-200 rounded w-1/3"></div>
          </div>

          <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white rounded-full relative">
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">×</span>
          </div>
        </div>

        <div className="absolute -top-6 -left-6 w-6 h-6 bg-blue-300 rounded-full"></div>
        <div className="absolute -top-4 right-12 w-4 h-4 bg-blue-400 rounded-full"></div>
        <div className="absolute -bottom-6 left-12 w-5 h-5 bg-blue-200 rounded-full"></div>
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-medium text-gray-700 mb-3">
          Bạn chưa có hồ sơ bệnh nhân
        </h3>
        <p className="text-gray-500 text-xl">
          Vui lòng thêm hồ sơ để được đặt khám
        </p>
      </div>
      <div className="flex justify-around w-full max-w-2xl mt-8">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mt-2.5 flex items-center text-lg"
        >
          <Undo2 className="mr-2" />
          Quay Lại
        </Button>
        <Button
          onClick={handleCreateProfile}
          className="mt-4 flex items-center gap-2"
        >
          <Plus size={16} />
          Thêm hồ sơ
        </Button>
      </div>
    </div>
  );
}

export default ProfileMissing;
