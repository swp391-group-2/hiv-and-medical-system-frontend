import AppointmentBooking from "@/pages/appointment/appointment-booking";
import BookingConfirm from "@/pages/appointment/booking-confirm";
import SelectProfileBooking from "@/pages/appointment/select-profile-booking";
import ServiceConfirmatoryTest from "@/pages/services/service-confirmatorytest";
import ServiceDoctorList from "@/pages/services/service-doctor-list";
import ServiceScreeningTest from "@/pages/services/service-screeningtest";
import { Route, Routes } from "react-router-dom";

function ServiceRouters() {
  return (
    <Routes>
      {/* Service Information Pages */}
      <Route path="screening" element={<ServiceScreeningTest />} />
      <Route path="confirmation" element={<ServiceConfirmatoryTest />} />
      <Route path="consultation">
        <Route path="doctors" element={<ServiceDoctorList />} />
      </Route>

      <Route path="booking/:serviceType" element={<AppointmentBooking />} />
      <Route
        path="booking/consultation/:doctorId"
        element={<AppointmentBooking />}
      />

      <Route
        path="select-profile-booking/:serviceType"
        element={<SelectProfileBooking />}
      />
      <Route
        path="select-profile-booking/consultation/:doctorId"
        element={<SelectProfileBooking />}
      />

      <Route path="booking-confirm/:serviceType" element={<BookingConfirm />} />
      <Route
        path="booking-confirm/consultation/:doctorId"
        element={<BookingConfirm />}
      />
    </Routes>
  );
}

export default ServiceRouters;
