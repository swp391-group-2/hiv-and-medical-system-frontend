import React from "react";
import HeaderSection from "./HeaderSection";
import IntroSection from "./IntronSection";
import ServicesSection from "./ServicesSection";
import EducationSection from "./EducationSection";

import StoriesSection from "./StoriesSection";
import DoctorBookingSection from "./DoctorBookingSection";
import ContactSection from "./ContactSection";
import ServiceSlicer from "./ServiceSlicederSection";

const LandingPage = () => {
  return (
    <div className="font-sans text-sm text-gray-900">
      <ServiceSlicer/>
      {/* Header */}
      <HeaderSection />

      {/* Giới thiệu */}
      <IntroSection />

      {/* Dịch vụ */}
      <ServicesSection />

      {/* Tài liệu giáo dục */}
      <EducationSection />

      {/* Chia sẻ dễ thấu hiểu */}
      <StoriesSection />

      {/* Tìm bác sĩ và Đặt lịch */}
      <DoctorBookingSection />

      {/* Tổng đài */}
      <ContactSection />
    </div>
  );
};

export default LandingPage;
