export const AppRoutes = {
  // Trang chính
  HOME: "/",

  // Các dịch vụ chính
  SCREENING: "/screening",
  CONFIRMATORY: "/confirmatory",
  EXAMINATION: "/examination",
  CONSULTATION: "/consultation",
  CONSULTATION_DOCTORS: "/consultation/doctors",
  //   đăn ký đăng nhập
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  // Các trang thông tin
  EDUCATION: "/education",
  CONTACT: "/contact",
  SERVICE: "/service",
  QANDA: "/qanda",
  USER_PROFILE: "/user/profile",
  USER_APPOINTMENTS: "/user/appointments",
  USER_ARV: "/user/arv",
  USER_CHECKUP_RESULT: "/user/checkup-result",
  USER_TEST_RESULT: "/user/test-result",
} as const;

// Đối với các route có tham số động, bạn vẫn sẽ cần các hàm helper:
export const buildRoute = {
  bookingService: (serviceId: string) => `/booking/${serviceId}`,
  bookingConsultationDoctor: (doctorId: string) =>
    `/booking/consultation/${doctorId}`,
  selectProfileBooking: (serviceId: string) =>
    `/select-profile-booking/${serviceId}`,
  selectProfileBookingConsultation: (doctorId: string) =>
    `/select-profile-booking/consultation/${doctorId}`,
  bookingConfirm: (serviceId: string) => `/booking-confirm/${serviceId}`,
  bookingConfirmConsultation: (doctorId: string) =>
    `/booking-confirm/consultation/${doctorId}`,
};
