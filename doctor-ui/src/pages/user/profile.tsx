import UserSummary from "@/components/user/user-summary";
import ProfileTabsContainer from "@/components/user/profile-tabs";
import axios from "axios";
import { useState, useEffect } from "react";
import type { ProfileFormValues } from "@/components/user/profile-info-form";

export type UserProfileValues = {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  gender: string;
  dob: string; // expecting "YYYY-MM-DD"
  idNumber: string;
  insuranceNumber: string;
  occupation: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
};

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
    <div className="w-full mt-7">
      <h2 className="text-3xl font-bold mb-5">Hồ sơ</h2>
      <div className="w-full flex gap-5">
        <UserSummary user={user} />
        {user && (
          <ProfileTabsContainer
            user={user}
            handlePasswordSubmit={handlePasswordSubmit}
            handleProfileSubmit={handleProfileSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
