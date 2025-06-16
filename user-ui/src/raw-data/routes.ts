import { AppRoutes } from "@/constants/appRoutes";

export const routes: { href: string; label: string }[] = [
  {
    href: AppRoutes.HOME,
    label: "Trang chủ",
  },
  {
    href: AppRoutes.SERVICE,
    label: "Dịch Vụ",
  },
  {
    href: AppRoutes.EDUCATION,
    label: "Giáo dục HIV",
  },
  {
    href: AppRoutes.QANDA,
    label: "Hỏi đáp",
  },
  {
    href: AppRoutes.CONTACT,
    label: "Liên hệ",
  },
];

export const services: { href: string; title: string; desc: string }[] = [
  {
    href: AppRoutes.SCREENING,
    title: "Xét nghiệm sàng lọc HIV",
    desc: "Xét nghiệm nhằm phát hiện người nghi ngờ nhiễm HIV.",
  },
  {
    href: AppRoutes.CONFIRMATORY,
    title: "Xét nghiệm khẳng định HIV",
    desc: "Xác định chắc chắn một người có nhiễm HIV.",
  },
  {
    href: AppRoutes.CONSULTATION_DOCTORS,
    title: "Khám điều trị HIV",
    desc: "Bao gồm khám lâm sàng, xét nghiệm CD4, tải lượng virus, điều trị bằng thuốc ARV và theo dõi định kỳ.",
  },
];
