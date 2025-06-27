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
import { Pill, Plus, RotateCcw, Search } from "lucide-react";
import { CreateStaffForm } from "@/components/manager/create-staff-form";
import { useQueryClient } from "@tanstack/react-query";
import { ArvList } from "@/components/manager/arv-list";
import { useArvs } from "@/api/arv";
import { InternalLoading, LoadingOverlay } from "@/components/loading-overlay";
import { CreateArvForm } from "@/components/manager/create-arv-form";

const ManagerARV = () => {
  const queryClient = useQueryClient();
  const { data: arvList = [], isLoading, isError, isFetching } = useArvs();
  const [search, setSearch] = useState("");
  const handleReLoadList = () => {
    queryClient.invalidateQueries({ queryKey: ["arvs"] });
  };

  if (isLoading) return <LoadingOverlay message="Đang tải" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý phác đồ</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center bg-blue-500 hover:bg-blue-600 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Thêm phác đồ
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-between min-w-[1000px] min-h-[700px]">
            <DialogHeader>
              <DialogTitle>Thêm phác đồ mới</DialogTitle>
            </DialogHeader>
            <CreateArvForm className="flex flex-col justify-between space-y-4 grow" />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm tên phác đồ..."
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
              <Pill className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tổng phác đồ</p>
                <p className="text-2xl font-bold">{}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Danh sách phác đồ</CardTitle>
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
            <InternalLoading message="Đang tải" />
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <ArvList data={arvList} isError={isError} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerARV;
