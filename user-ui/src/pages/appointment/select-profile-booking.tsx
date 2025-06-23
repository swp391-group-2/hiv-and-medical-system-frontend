import userApi from "@/apis/user.api";
import { getProfileFromLS } from "@/apis/userauth";
import ProfileDone from "@/components/appointmenBooking/profile-done";
import ProfileMissing from "@/components/appointmenBooking/profile-missing";
import { AppRoutes } from "@/constants/appRoutes";
import useBookingStore from "@/stores/booking.store";
import type { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SelectProfileBooking() {
  const user: User = getProfileFromLS();
  const scheduleSlot = useBookingStore((state) => state.scheduleSlot);
  const labTestSlot = useBookingStore((state) => state.labTestSlot);
  const service = useBookingStore((state) => state.service);
  const navigate = useNavigate();

  const { doctorId, serviceType } = useParams<{
    doctorId: string;
    serviceType: string;
  }>();

  useEffect(() => {
    console.log("hello");
    if (!service || (!scheduleSlot && !labTestSlot)) {
      if (doctorId) {
        navigate(AppRoutes.HOME);
      } else if (serviceType) {
        navigate(AppRoutes.HOME);
      }
    }
  }, []);
  const { data: patientData, isLoading } = useQuery({
    queryKey: ["patient-info", user.email],
    queryFn: async () => {
      const response = await userApi.getPatientProfile(user.email);
      return response.data;
    },
    enabled: !!user.email,
  });
  const hasProfile = patientData?.data.identificationCard;
  const setUser = useBookingStore((state) => state.setUser);
  if (hasProfile) {
    setUser(patientData.data);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold text-center my-8 text-primary">
        Chọn Hồ Sơ Đặt Lịch Khám
      </h1>
      {hasProfile ? (
        <ProfileDone patientData={patientData.data} />
      ) : (
        <ProfileMissing />
      )}
    </div>
  );
}

export default SelectProfileBooking;
