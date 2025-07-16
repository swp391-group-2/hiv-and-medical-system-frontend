import { useQuery } from "@tanstack/react-query";
import { getAllPatientAccounts } from "@/api/admin";
import { PatientTable, LoadingSpinner, ErrorMessage } from "@/components/admin";

const PatientManagement = () => {
  // Fetch all patients
  const {
    data: patients = [],
    isLoading: isPatientsLoading,
    error: patientsError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatientAccounts,
  });

  if (isPatientsLoading) {
    return <LoadingSpinner />;
  }

  if (patientsError) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý bệnh nhân</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin bệnh nhân trong hệ thống
          </p>
        </div>
      </div>

      {/* Patient Table */}
      <PatientTable patients={patients} />
    </div>
  );
};

export default PatientManagement;
