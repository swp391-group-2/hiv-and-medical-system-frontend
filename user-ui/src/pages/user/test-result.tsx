import userApi from "@/apis/user.api";
import TestRsTabs from "@/components/user/result/test-rs-tabs";
import { useProfileStore } from "@/stores/profile.store";
import { useQuery } from "@tanstack/react-query";

const TestResult = () => {
  const userProfile = useProfileStore((state) => state.profile);
  const { data: LabResult, isLoading } = useQuery({
    queryKey: ["LabResult"],
    queryFn: async () => {
      const response = await userApi.getPatientLabResults(
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

  const labResultList =
    LabResult?.data.filter((item) => item.resultStatus === "FINISHED") || [];

  if (!labResultList || labResultList.length === 0) {
    return (
      <section className="w-full mt-7 mr-10">
        <h1 className="text-3xl text-primary font-bold mb-5">
          Kết quả xét nghiệm
        </h1>
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có kết quả xét nghiệm
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Hiện tại chưa có kết quả xét nghiệm nào. Kết quả sẽ được hiển thị
            tại đây sau khi hoàn thành.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl text-primary font-bold mb-5">
        Kết quả xét nghiệm
      </h1>
      <TestRsTabs labResultList={labResultList} />
    </section>
  );
};

export default TestResult;
