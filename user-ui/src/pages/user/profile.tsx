import UserSummary from "@/components/user/profile/user-summary";
import ProfileTabsContainer from "@/components/user/profile/profile-tabs";
import axios from "axios";
import { useState, useEffect } from "react";
import type { ProfileFormValues } from "@/components/user/profile/profile-info-form";
import type { UserProfileValues } from "@/types/userProfile.type";

const UserProfile = () => {
  const [user, setUser] = useState<UserProfileValues | null>(null);

  useEffect(() => {
    axios
      .get<UserProfileValues>("/api/current-user")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const handlePasswordSubmit = async (values: {
    phone: string;
    password: string;
    confirm: string;
  }) => {
    try {
      await axios.post(
        "/api/user/change-password",
        {
          phone: values.phone,
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

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    try {
      await axios.post("/api/user/update-profile", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <section className="w-full mt-7">
      <h2 className="text-3xl font-bold mb-5">Hồ sơ</h2>
      <div className="w-full flex gap-5">
        {user && <UserSummary {...user} />}
        {user && (
          <ProfileTabsContainer
            user={user}
            handlePasswordSubmit={handlePasswordSubmit}
            handleProfileSubmit={handleProfileSubmit}
          />
        )}
      </div>
    </section>
  );
};

export default UserProfile;
