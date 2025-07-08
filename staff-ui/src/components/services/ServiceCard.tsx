import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Eye } from "lucide-react";
import type { Service } from "@/types/services";
import { SERVICE_TYPE_LABELS } from "@/types/services";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onView: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onView,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case "CONSULTATION":
        return "bg-blue-100 text-blue-800";
      case "SCREENING":
        return "bg-green-100 text-green-800";
      case "CONFIRMATORY":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Service Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {service.name}
              </h3>
              <div className="mt-1">
                <Badge
                  className={`${getServiceTypeColor(
                    service.serviceType
                  )} border-0`}
                  variant="secondary"
                >
                  {SERVICE_TYPE_LABELS[service.serviceType]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-xl font-bold text-blue-600">
            {formatPrice(service.price)}
          </div>

          {/* Service Info */}
          <div className="text-sm text-gray-600 space-y-1">
            <div>ID: {service.id}</div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(service)}
              className="flex-1 flex items-center gap-2"
            >
              <Eye size={16} />
              Xem chi tiết
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onEdit(service)}
              className="flex-1 flex items-center gap-2"
            >
              <Edit2 size={16} />
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
