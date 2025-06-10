import type { LucideIcon } from "lucide-react";
import { Phone, Mail, CircleUserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AvatarUpload from "./avatar-upload";
import { type User } from "@/pages/user/profile";
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

interface UserSummaryProps {
  user: User | null;
}

const UserSummary = ({ user }: UserSummaryProps) => {
  const handleUploadAvatar = (file: File) => {
    console.log("File selected: " + file);
  };

  return (
    <Card className="flex-1/4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <AvatarUpload
        imageUrl={user && user.imageUrl ? user.imageUrl : ""}
        onUpload={handleUploadAvatar}
      />
      <CardHeader className="flex flex-col items-center px-6 pt-6 pb-4 border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {user ? user.name : ""}
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-gray-500">
          {user ? user.phone : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-4">
        <InfoRow
          icon={Phone}
          name="Số điện thoại"
          desc={user ? user.phone : ""}
        />
        <InfoRow icon={Mail} name="Email" desc={user ? user.email : ""} />
        <InfoRow
          icon={CircleUserRound}
          name="Mã bệnh nhân"
          desc={user ? user.id : ""}
        />
      </CardContent>
    </Card>
  );
};

export default UserSummary;
