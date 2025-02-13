import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { spinner } from "../../../App";

export const Layout = () => {
  const loading = useAppSelector((state) => state.spinner.loading);
  return (
    <>
      {loading && spinner}
      <div className="row">
        <div
          style={{ backgroundColor: "#E0E0E0" }}
          className="col-2 min-vh-100 d-flex flex-column"
        >
          <Sidebar />
        </div>
        <div className="col-10">
          <div
            style={{ backgroundColor: "#E0E0E0", height: "60px" }}
            className="row"
          >
            <Header />
          </div>
          <div className="row">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
