import React from "react";
import avatar from "../../asset/image/avatar.jpg";

export const Profile = () => {
  return (
    <div className="container">
      <div className="row mt-3 mx-4 d-flex justify-content-around gap-2 flex-nowrap">
        <div className="col-4 p-3 d-flex flex-column align-items-center bg-light shadow rounded">
          <img src={avatar} width={290} height={350} alt="avatar" />
          <h4>Trương Xuân Giang</h4>
          <p>B21DCPT092 - D21PTDPT</p>
        </div>
        <div className="col-8 p-3 d-flex flex-column align-items-center bg-light shadow rounded">
          <h2 className="mb-5">Thông tin</h2>

          <form className="row">
            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">Họ và tên:</label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="Trương Xuân Giang"
                readOnly
              />
            </div>

            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">Mã sinh viên:</label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="B21DCPT092"
                readOnly
              />
            </div>

            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">Ngày sinh:</label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="10/10/2003"
                readOnly
              />
            </div>

            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">
                Lớp hành chính:
              </label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="D21PTDPT"
                readOnly
              />
            </div>

            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">
                Email:
              </label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="giangtx.b21pt092@stu.ptit.edu.vn"
                readOnly
              />
            </div>

            <div className="mb-2 col-sm-6">
              <label className="form-label fw-bold fs-5 ">
                Số điện thoại:
              </label>
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="0378804074"
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mx-4 d-flex flex-column justify-content-around gap-2 flex-nowrap shadow rounded mt-3">
        <h3 className="m-4">Link bài tập</h3>
        <form className="mx-4 py-4">
          <div className="row g-2 align-items-center">
            <label className="col-2 fs-5 form-label fw-bold">
              Link Github:
            </label>
            <div className="col-10">
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="Trương Xuân Giang"
                readOnly
              />
            </div>
          </div>

          <div className="row g-2 align-items-center">
            <label className="col-2 fs-5 form-label fw-bold">
              Link báo cáo PDF:
            </label>
            <div className="col-10">
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="B21DCPT092"
                readOnly
              />
            </div>
          </div>

          <div className="row g-2 align-items-center">
            <label className="col-2 fs-5 form-label fw-bold">
              Link API docs:
            </label>
            <div className="col-10">
              <input
                type="text"
                className="form-control fs-5 border-0 border-bottom border-3 rounded-0"
                value="B21DCPT092"
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
