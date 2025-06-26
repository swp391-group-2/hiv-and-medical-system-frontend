import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAllDoctorAccounts,
  getAllStaffAccounts,
  getAllPatientAccounts,
} from "@/api/admin";
import { type Doctor } from "@/types/doctor";
import {
  AddDoctorDialog,
  AddStaffDialog,
  UpdateDoctorDialog,
  DoctorTable,
  StaffTable,
  PatientTable,
  LoadingSpinner,
  ErrorMessage,
} from "@/components/admin";

const AdminAccounts = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Fetch all doctors
  const {
    data: doctors = [],
    isLoading: isDoctorsLoading,
    error: doctorsError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctorAccounts,
  });

  // Fetch all staff
  const {
    data: staffs = [],
    isLoading: isStaffsLoading,
    error: staffsError,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: getAllStaffAccounts,
  });

  // Fetch all patients
  const {
    data: patients = [],
    isLoading: isPatientsLoading,
    error: patientsError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatientAccounts,
  });

  const handleEditClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsUpdateDialogOpen(true);
  };

  const isLoading =
    activeTab === "doctor"
      ? isDoctorsLoading
      : activeTab === "staff"
      ? isStaffsLoading
      : isPatientsLoading;

  const error =
    activeTab === "doctor"
      ? doctorsError
      : activeTab === "staff"
      ? staffsError
      : patientsError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản trong hệ thống
          </p>
        </div>

        {/* Add Account Dialog - Dynamic based on active tab */}
        {activeTab === "doctor" && (
          <AddDoctorDialog
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          />
        )}
        {activeTab === "staff" && (
          <AddStaffDialog
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          />
        )}

        {/* Update Doctor Dialog */}
        <UpdateDoctorDialog
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          doctor={selectedDoctor}
        />
      </div>

      {/* Tabs for different account types */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctor">Bác sĩ</TabsTrigger>
          <TabsTrigger value="staff">Nhân viên</TabsTrigger>
          <TabsTrigger value="patient">Bệnh nhân</TabsTrigger>
        </TabsList>

        {/* Doctor Tab */}
        <TabsContent value="doctor">
          <DoctorTable doctors={doctors} onEditClick={handleEditClick} />
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <StaffTable staffs={staffs} />
        </TabsContent>

        {/* Patient Tab */}
        <TabsContent value="patient">
          <PatientTable patients={patients} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAccounts;
