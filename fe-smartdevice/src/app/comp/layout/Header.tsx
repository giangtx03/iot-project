import React from "react";
import userIcon from "../../../asset/image/user-icon.png";

export const Header = () => {
  return (
    <div className="d-flex align-items-center justify-content-end px-5 gap-2">
      <img src={userIcon} alt="Icon User" width="30" height="30" />
      <p className="mb-0">Giang TX</p>
    </div>
  );
};
