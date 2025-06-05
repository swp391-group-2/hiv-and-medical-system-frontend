import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountUpdateForm } from "./account-update-form";
import { ProfileInfoForm } from "./profile-info-form";
import { type UserProfileValues } from "@/pages/user/profile";
import { type AccountUpdateFormValues } from "./account-update-form";
import { type ProfileFormValues } from "./profile-info-form";

type ProfileTabsProps = {
  user: UserProfileValues;
  handlePasswordSubmit: (values: AccountUpdateFormValues) => Promise<void>;
  handleProfileSubmit: (values: ProfileFormValues) => Promise<void>;
};

const ProfileTabsContainer = ({
  user,
  handlePasswordSubmit,
  handleProfileSubmit,
}: ProfileTabsProps) => {
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
        <TabsContent value="account" className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Thông tin tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="">
              <AccountUpdateForm
                phone={user.phone}
                onSubmit={handlePasswordSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="med-record" className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Hồ sơ khám bệnh</CardTitle>
            </CardHeader>
            <CardContent className="">
              <ProfileInfoForm onSubmit={handleProfileSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileTabsContainer;
