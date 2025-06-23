import UserSummary from "@/components/user/profile/user-summary";
import ProfileTabsContainer from "@/components/user/profile/profile-tabs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "@/types/user.type";
import { getProfileFromLS } from "@/apis/userauth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "@/apis/user.api";
import type { UserProfileUpdateValues } from "@/types/userProfile.type";
import { toast } from "sonner";
import { useProfileStore } from "@/stores/profile.store";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUserProfile = useProfileStore((state) => state.setProfile);

  const handlePasswordSubmit = async (values: {
    email: string;
    password: string;
    confirm: string;
  }) => {
    try {
      await axios.post(
        "/api/user/change-password",
        {
          phone: values.email,
          newPassword: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  const user: User = getProfileFromLS();

  const { data, isLoading } = useQuery({
    queryKey: ["patient-info", user.email],
    queryFn: async () => {
      const response = await userApi.getPatientProfile(user.email);
      return response.data;
    },
    enabled: !!user.email,
  });

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: UserProfileUpdateValues) => {
      if (!data) throw new Error("Patient data not available");
      const response = await userApi.updatePatientProfile(
        data.data.patientId,
        profileData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật hồ sơ thành công");
      queryClient.invalidateQueries({ queryKey: ["patient-info", user.email] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error(
          "Update profile error:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unknown error:", error);
      }
    },
  });

  const handleProfileSubmit = async (values: UserProfileUpdateValues) => {
    if (!data) {
      toast.error("Không thể cập nhật hồ sơ, dữ liệu không hợp lệ");
      return;
    }
    try {
      await updateProfileMutation.mutateAsync(values);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating profile:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unknown error:", error);
      }
    }
    if (location.state) {
      navigate(location.state.path);
    }
  };
  if (isLoading) {
    return (
      <div className="w-full mt-7 flex justify-center items-center mr-10">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }
  if (data) {
    setUserProfile(data.data);
  }

  return (
    <section className="w-full mt-7">
      <h2 className="text-3xl text-primary font-bold mb-5">Hồ sơ</h2>
      <div className="w-full flex gap-5">
        <UserSummary />

        <ProfileTabsContainer
          handlePasswordSubmit={handlePasswordSubmit}
          handleProfileSubmit={handleProfileSubmit}
        />
      </div>
    </section>
  );
};

export default UserProfile;
