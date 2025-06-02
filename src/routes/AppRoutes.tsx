import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import LandingPage from "@/pages/LandingPage/LandingPage";
import XetNghiemKhangDinhPage from "@/pages/MedicalExaminationService/XetNghiemKhangDinhPage/XetNghiemKhangDinhPage";
import XetNghiemSangLocPage from "@/pages/MedicalExaminationService/XetNghiemSangLocPage/XetNghiemSangLocPage";
import React from "react";
import { Routes , Route} from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
				<Route index element={<LandingPage />} />
        <Route path='xet-nghiem-sang-loc' element={<XetNghiemSangLocPage />} />
        <Route path='xet-nghiem-khang-dinh' element={<XetNghiemKhangDinhPage />} />
			</Route>
      {/* <Route path='/admin' element={<Admin />}>
				
			</Route> */}
    </Routes>
  );
};

export default AppRoutes;
