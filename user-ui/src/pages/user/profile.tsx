import { Sidebar, SidebarNav, SidebarNavItem } from "@/components/user/sidebar";
import { User, Calendar, Pill, FileText, FlaskConical } from "lucide-react";

import UserSummary from "@/components/user/user-summary";
import ProfileTabsContainer from "@/components/user/profile-tabs";
import axios from "axios";
import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  imageUrl?: string;
}

export interface UserMedicalRecord extends User {
  gender: string;
  dob: Date;
  citizen_id: string;
  medical_assurance_number: string;
  profession: string;
  city: string;
  district: string;
  town: string;
  address: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get<User>("/api/current-user")
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
      const response = await axios.post(
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

  return (
    <div className="w-full flex gap-5">
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem
            path="/user-profile"
            icon={User}
            text="Hồ sơ"
            isActive
          />
          <SidebarNavItem
            path="/user-schedule"
            icon={Calendar}
            text="Lịch khám"
            isActive
          />
          <SidebarNavItem
            path="/user-arv"
            icon={Pill}
            text="Phác đồ điều trị"
            isActive
          />
          <SidebarNavItem
            path="/user-checkup-result"
            icon={FileText}
            text="Kết quả khám"
            isActive
          />
          <SidebarNavItem
            path="/user-test-result"
            icon={FlaskConical}
            text="Kết quả xét nghiệm"
            isActive
          />
        </SidebarNav>
      </Sidebar>
      <div className="w-full mt-7">
        <h2 className="text-3xl font-bold mb-5">Hồ sơ</h2>
        <div className="w-full flex gap-5">
          <UserSummary user={user} />
          <ProfileTabsContainer
            user={user}
            handlePasswordSubmit={handlePasswordSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
