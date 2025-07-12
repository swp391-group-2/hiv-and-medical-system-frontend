import userApi from "@/apis/user.api";
import ProfileDone from "@/components/appointmenBooking/profile-done";
import ProfileMissing from "@/components/appointmenBooking/profile-missing";
import ErrorQuery from "@/components/common/error-query";
import Loading from "@/components/common/loading";
import { AppRoutes } from "@/constants/appRoutes";
import useBookingStore from "@/stores/booking.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SelectProfileBooking() {
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
  const {
    data: patientData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["patient-info"],
    queryFn: async () => {
      const response = await userApi.getPatientProfile();
      return response.data;
    },
  });
  const hasProfile = patientData?.data.identificationCard;
  const setUser = useBookingStore((state) => state.setUser);
  if (hasProfile) {
    setUser(patientData.data);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ErrorQuery
          error={error}
          message="Không thể tải thông tin bệnh nhân. Vui lòng thử lại sau."
          onRetry={refetch}
        />
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
