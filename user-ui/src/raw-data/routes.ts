export const routes: { href: string; label: string }[] = [
  {
    href: "/",
    label: "Trang chủ",
  },
  {
    href: "/service",
    label: "Dịch Vụ",
  },
  {
    href: "/education",
    label: "Giáo dục HIV",
  },
  {
    href: "/question",
    label: "Hỏi đáp",
  },
  {
    href: "/profile",
    label: "Hồ sơ",
  },
  {
    href: "/contact",
    label: "Liên hệ",
  },
];

export const services: { href: string; title: string; desc: string }[] = [
  {
    href: "service/screeningtest",
    title: "Xét nghiệm sàng lọc HIV",
    desc: "Xét nghiệm nhằm phát hiện người nghi ngờ nhiễm HIV.",
  },
  {
    href: "service/confirmatorytest",
    title: "Xét nghiệm khẳng định HIV",
    desc: "Xác định chắc chắn một người có nhiễm HIV.",
  },
  {
    href: "service/treatment",
    title: "Khám và điều trị HIV",
    desc: "Bao gồm khám lâm sàng, xét nghiệm CD4, tải lượng virus, điều trị bằng thuốc ARV và theo dõi định kỳ.",
  },
];
