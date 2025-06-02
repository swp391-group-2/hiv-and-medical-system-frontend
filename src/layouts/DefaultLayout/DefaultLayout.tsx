import React from "react";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";

const DefaultLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="body-page">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
