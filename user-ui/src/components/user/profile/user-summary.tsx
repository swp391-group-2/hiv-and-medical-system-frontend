import type { LucideIcon } from "lucide-react";
import { Mail, CircleUserRound, MapPinHouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarUpload from "./avatar-upload";
import { useProfileStore } from "@/stores/profile.store";

const InfoRow = ({
  icon: Icon,
  name,
  desc,
}: {
  icon: LucideIcon;
  name: string;
  desc: string;
}) => {
  return (
    <div className="flex gap-4 items-center">
      <Icon className="w-6 h-6 text-gray-400" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{name}</span>
        <span className="text-sm font-medium text-gray-900">{desc}</span>
      </div>
    </div>
  );
};

const UserSummary = () => {
  const handleUploadAvatar = (file: File) => {
    console.log("File selected: " + file);
  };
  const userProfile = useProfileStore((state) => state.profile);

  return (
    <Card className="flex-1/4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <AvatarUpload imageUrl={""} onUpload={handleUploadAvatar} />
      <CardHeader className="flex flex-col items-center px-6 pt-6 pb-4 border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {userProfile.fullName}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 py-4 space-y-4">
        <InfoRow icon={Mail} name="Email" desc={userProfile.email} />
        <InfoRow
          icon={MapPinHouse}
          name="Địa Chỉ "
          desc={userProfile.address || "Chưa có địa chỉ"}
        />
        <InfoRow
          icon={CircleUserRound}
          name="Mã bệnh nhân"
          desc={userProfile.patientCode || "Chưa có mã bệnh nhân"}
        />
      </CardContent>
    </Card>
  );
};

export default UserSummary;
