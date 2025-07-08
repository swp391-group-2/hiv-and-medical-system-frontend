import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, AlertCircle, Info } from "lucide-react";
import { getAllServices, updateService } from "@/api/services";
import type { Service, UpdateServiceRequest } from "@/types/services";
import { SERVICE_TYPE_OPTIONS, SERVICE_TYPE_LABELS } from "@/types/services";
import ServiceForm from "@/components/services/ServiceForm";
import ServiceCard from "@/components/services/ServiceCard";

const ManageServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Dialog states
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Fetch services
  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllServices();
      setServices(data);
      setFilteredServices(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Lỗi khi tải danh sách dịch vụ"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services
  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.id.toString().includes(searchTerm)
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (service) => service.serviceType === filterType
      );
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, filterType]);

  // Handle update service
  const handleUpdateService = async (data: UpdateServiceRequest) => {
    if (!selectedService) return;

    setFormLoading(true);
    try {
      await updateService(selectedService.id, data);
      setSuccess("Cập nhật dịch vụ thành công!");
      setShowEditDialog(false);
      setSelectedService(null);
      await fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi cập nhật dịch vụ");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowEditDialog(true);
  };

  // Handle view
  const handleView = (service: Service) => {
    setSelectedService(service);
    setShowViewDialog(true);
  };

  // Clear messages
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-gray-600 mt-1">
            Xem và quản lý các dịch vụ y tế trong hệ thống
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="ml-auto"
          >
            ✕
          </Button>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <Info className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="ml-auto"
          >
            ✕
          </Button>
        </Alert>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Tìm kiếm theo tên hoặc ID dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by type */}
            <div className="md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Lọc theo loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  {SERVICE_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Refresh */}
            <Button
              variant="outline"
              onClick={fetchServices}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Làm mới
            </Button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Hiển thị {filteredServices.length} / {services.length} dịch vụ
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
            <p className="text-gray-600">Đang tải danh sách dịch vụ...</p>
          </div>
        </div>
      ) : filteredServices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-gray-500">
              {services.length === 0 ? (
                <>
                  <Info className="mx-auto mb-4" size={48} />
                  <p className="text-lg font-medium mb-2">
                    Chưa có dịch vụ nào
                  </p>
                  <p>Hiện tại hệ thống chưa có dịch vụ nào</p>
                </>
              ) : (
                <>
                  <Search className="mx-auto mb-4" size={48} />
                  <p className="text-lg font-medium mb-2">
                    Không tìm thấy dịch vụ
                  </p>
                  <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <ServiceForm
              service={selectedService}
              onSubmit={handleUpdateService}
              onCancel={() => {
                setShowEditDialog(false);
                setSelectedService(null);
              }}
              loading={formLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết dịch vụ</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    ID
                  </label>
                  <p className="text-lg">{selectedService.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Tên dịch vụ
                  </label>
                  <p className="text-lg font-semibold">
                    {selectedService.name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Giá dịch vụ
                  </label>
                  <p className="text-xl font-bold text-blue-600">
                    {formatPrice(selectedService.price)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Loại dịch vụ
                  </label>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-800 border-0">
                      {SERVICE_TYPE_LABELS[selectedService.serviceType]}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => setShowViewDialog(false)}
                    className="w-full"
                  >
                    Đóng
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageServices;
