import userApi from "@/apis/user.api";
import CheckUpResultList from "@/components/user/result/checkup-rs-list";
import { useProfileStore } from "@/stores/profile.store";
import type { AppointmentCompletedApiResponse } from "@/types/appointment.type";
import { useQuery } from "@tanstack/react-query";

const CheckUpResult = () => {
  const userProfile = useProfileStore((state) => state.profile);
  const { data, isLoading, isError, error } =
    useQuery<AppointmentCompletedApiResponse>({
      queryKey: ["checkup-result"],
      queryFn: async () => {
        const response = await userApi.getPatientAppointmentsComplete(
          userProfile.patientId
        );
        return response.data;
      },
    });
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

  if (isError) {
    console.error("Error fetching check-up results:", error);
  }

  const checkUpList = data?.data || [];

  if (checkUpList.length === 0) {
    return (
      <section className="w-full mt-7 mr-10">
        <h1 className="text-3xl font-bold mb-5">Kết quả khám</h1>
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 mb-4 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Chưa có kết quả khám
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Bạn chưa có kết quả khám nào. Kết quả sẽ hiển thị ở đây sau khi bạn
            hoàn thành các cuộc hẹn khám.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl font-bold mb-5">Kết quả khám</h1>
      <CheckUpResultList list={checkUpList} />
    </section>
  );
};

export default CheckUpResult;
