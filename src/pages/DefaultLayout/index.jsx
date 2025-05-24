import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="body-page">
        <Outlet /> {/* This will render the matched child route */}
      </div>
    </div>
  );
};

export default DefaultLayout;
