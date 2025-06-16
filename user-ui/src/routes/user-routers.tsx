import Appointments from "@/pages/user/appointments";
import Arv from "@/pages/user/arv";
import CheckUpResult from "@/pages/user/checkup-result";
import UserProfile from "@/pages/user/profile";
import TestResult from "@/pages/user/test-result";
import UserBase from "@/pages/user/user-base";
import { Routes, Route } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserBase />}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="arv" element={<Arv />} />
        <Route path="checkup-result" element={<CheckUpResult />} />
        <Route path="test-result" element={<TestResult />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
