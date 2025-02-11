import React from "react";
import { FaCaretDown } from "react-icons/fa";

export const SearchBox = (props: any) => {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex gap-2" style={{ width: "40%" }}>
        <input
          type="text"
          className="form-control ms-2 border-0 border-bottom border-2 border-dark rounded-0 shadow-none focus-ring"
          placeholder="Nhập nội dung..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onClickBtn();
          }}}
        />

        <button className="btn btn-primary w-25" onClick={props.onClickBtn}>
          Tìm kiếm
        </button>
      </div>
      <button className="btn btn-light ms-2"> Bộ lọc <FaCaretDown /> </button>
      <div className="ms-auto">
        <input
          type="datetime-local"
          className="form-control w-auto"
          placeholder="Chọn ngày giờ"
        />
      </div>
    </div>
  );
};
