import React from "react";
import logo from "../../../asset/image/smartdevice-logo.png";
import dashboardIcon from "../../../asset/image/dashboard-icon.png";
import historyIcon from "../../../asset/image/history-icon.png";
import statisticIcon from "../../../asset/image/statistic-icon.png";
import profileIcon from "../../../asset/image/user-icon.png";
import logoutIcon from "../../../asset/image/logout-icon.png";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", icon: dashboardIcon, label: "Bảng điều khiển" },
  { path: "/statistics", icon: statisticIcon, label: "Thống kê" },
  { path: "/history", icon: historyIcon, label: "Lịch sử" },
];

export const Sidebar = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">
          <img src={logo} alt="logo" width="120" height="120" />
          <p className="fs-3 text-center mb-2">Smart Device</p>
          <hr
            style={{ width: "98%" }}
            className="ms-2 border border-3 border-white"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12 pe-0 d-flex flex-column align-items-center">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="d-flex align-items-center justify-content-start nav-link p-2 gap-2 w-100"
            >
              <img src={item.icon} alt={item.label} width={40} height={40} />
              <p className="fs-5 my-auto">{item.label}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="row mt-auto mb-2">
        <div className="col-12 pe-0 d-flex flex-column align-items-center">
          <NavLink
            to={"/profile"}
            className="d-flex align-items-center justify-content-start nav-link p-2 gap-2 w-100"
          >
            <img src={profileIcon} alt='profile' width={40} height={40} />
            <p className="fs-5 my-auto">Thông tin</p>
          </NavLink>
          <NavLink
            to={""}
            className="d-flex align-items-center justify-content-start nav-link p-2 gap-2 w-100"
          >
            <img src={logoutIcon} alt='profile' width={40} height={40} />
            <p className="fs-5 my-auto">Đăng xuất</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};
