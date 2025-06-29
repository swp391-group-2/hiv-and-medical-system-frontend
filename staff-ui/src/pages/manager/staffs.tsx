import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, RotateCcw, Search, UserCheck, Users } from "lucide-react";
import { CreateStaffForm } from "@/components/manager/create-staff-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/api/http";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { StaffList } from "@/components/manager/staff-list";
import { useLabs, useManagers, useStaffs } from "@/api/staff";
import { LoadingOverlay, InternalLoading } from "@/components/loading-overlay";

// export const staffs: Staff[] = [
//   {
//     email: "alice.nguyen@hospital.com",
//     fullName: "Alice Nguyen",
//     status: "active",
//     role: "manager",
//     staffId: "STF001",
//     managerCode: "MGR001",
//     labTechnicianCode: "",
//     labTechnicianId: "",
//     staffCode: "SC001",
//     managerId: "",
//   },
//   {
//     email: "bob.tran@lab.org",
//     fullName: "Bob Tran",
//     status: "active",
//     role: "lab_technician",
//     staffId: "STF002",
//     managerCode: "MGR001",
//     labTechnicianCode: "LTC001",
//     labTechnicianId: "LT001",
//     staffCode: "SC002",
//     managerId: "STF001",
//   },
//   {
//     email: "carol.le@medcenter.vn",
//     fullName: "Carol Le",
//     status: "inactive",
//     role: "staff",
//     staffId: "STF003",
//     managerCode: "MGR002",
//     labTechnicianCode: "",
//     labTechnicianId: "",
//     staffCode: "SC003",
//     managerId: "STF004",
//   },
//   {
//     email: "david.pham@hospital.com",
//     fullName: "David Pham",
//     status: "active",
//     role: "lab_technician",
//     staffId: "STF004",
//     managerCode: "MGR002",
//     labTechnicianCode: "LTC002",
//     labTechnicianId: "LT002",
//     staffCode: "SC004",
//     managerId: "STF001",
//   },
//   {
//     email: "emma.vo@clinic.vn",
//     fullName: "Emma Vo",
//     status: "suspended",
//     role: "staff",
//     staffId: "STF005",
//     managerCode: "MGR001",
//     labTechnicianCode: "",
//     labTechnicianId: "",
//     staffCode: "SC005",
//     managerId: "STF001",
//   },
// ];

const ManagerStaffs = () => {
  const queryClient = useQueryClient();
  const {
    data: staffs = [],
    isLoading: isStaffLoading,
    isError: isStaffError,
    isFetching: isStaffFetching,
  } = useStaffs();
  const {
    data: labs = [],
    isLoading: isLabLoading,
    isError: isLabError,
    isFetching: isLabFetching,
  } = useLabs();
  const {
    data: managers = [],
    isLoading: isManagerLoading,
    isError: isManagerError,
    isFetching: isManagerFetching,
  } = useManagers();

  const allStaffs = staffs.concat(labs).concat(managers);

  // const allStaffs = useMemo(
  //   () => staffs.concat(labs).concat(managers),
  //   ["staffs", "labs", "managers"]
  // );

  const isLoading = isStaffLoading || isLabLoading || isManagerLoading;
  const isError = isStaffError || isLabError || isManagerError;
  const isFetching = isStaffFetching || isLabFetching || isManagerFetching;

  const activeStaffs = allStaffs.filter((s) => s.status === "ACTIVE").length;
  const [search, setSearch] = useState("");

  const filteredStaffs = allStaffs.filter((staff) =>
    staff.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const { mutate: deleteStaff } = useMutation<void, AxiosError, string>({
    mutationFn: async (id: string) => await http.delete(`/staffs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      toast.success("Xoá thành công");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <LoadingOverlay message="Đang tải danh sách" />;

  const handleDeleteStaff = (id: string) => deleteStaff(id);
  const handleReLoadList = () => {
    queryClient.invalidateQueries({ queryKey: ["staffs"] });
    queryClient.invalidateQueries({ queryKey: ["labs"] });
    queryClient.invalidateQueries({ queryKey: ["managers"] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý nhân viên</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center bg-blue-500 hover:bg-blue-600 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhân viên
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm nhân viên</DialogTitle>
            </DialogHeader>
            <CreateStaffForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm nhân viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tổng nhân viên</p>
                <p className="text-2xl font-bold">{allStaffs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">
                  Số tài khoản đang hoạt động
                </p>
                <p className="text-2xl font-bold">{activeStaffs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Danh sách nhân viên</CardTitle>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 cursor-pointer mr-4"
            onClick={handleReLoadList}
          >
            {"Làm mới "}
            <RotateCcw />
          </Button>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <InternalLoading message="Tải lại danh sách..." />
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <StaffList
                  data={filteredStaffs}
                  handleDeleteStaff={handleDeleteStaff}
                  isError={isError}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerStaffs;
