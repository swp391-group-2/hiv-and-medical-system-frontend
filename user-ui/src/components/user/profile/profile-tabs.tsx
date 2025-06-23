import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountUpdateForm } from "./account-update-form";
import { ProfileInfoForm } from "./profile-info-form";
import { type AccountUpdateFormValues } from "./account-update-form";
import type { UserProfileUpdateValues } from "@/types/userProfile.type";
import { useProfileStore } from "@/stores/profile.store";

type ProfileTabsProps = {
  handlePasswordSubmit: (values: AccountUpdateFormValues) => Promise<void>;
  handleProfileSubmit: (values: UserProfileUpdateValues) => Promise<void>;
};

const ProfileTabsContainer = ({
  handlePasswordSubmit,
  handleProfileSubmit,
}: ProfileTabsProps) => {
  const userProfile = useProfileStore((state) => state.profile);
  return (
    <section className="flex-3/4 bg-white rounded-xl overflow-hidden">
      <Tabs defaultValue="account" className="">
        <TabsList className="">
          <TabsTrigger value="account" className="">
            Tài khoản
          </TabsTrigger>
          <TabsTrigger value="med-record" className="">
            Hồ sơ khám bệnh
          </TabsTrigger>
        </TabsList>

        <TabsContent value="med-record" className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="text-3xl font-bold text-primary text-center">
                Hồ sơ khám bệnh
              </CardTitle>
              {!userProfile.identificationCard && (
                <CardDescription className="text-center text-lg text-red-600">
                  ! Hãy Cập Nhật Hồ Sơ Khám Bệnh Của Bạn Để Nhận Được Dịch Vụ
                  Tốt Nhất
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="">
              <ProfileInfoForm
                defaultValues={userProfile}
                onSubmit={handleProfileSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="text-3xl font-bold text-primary text-center">
                Đổi Mật Khẩu
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <AccountUpdateForm
                email={userProfile.email}
                onSubmit={handlePasswordSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileTabsContainer;
