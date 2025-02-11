import React from "react";

export const Paging = (props: any) => {
  const stylePrePage = {
    backgroundColor: "#B9B9B9",
    color: "#000000",
    border: "none",
    width: "80px",
    height: "40px",
    borderRadius: "5px",
  };
  const styleNextPage = {
    backgroundColor: "#BAE0E6",
    color: "#000000",
    border: "none",
    width: "80px",
    height: "40px",
    borderRadius: "5px",
  };

  const stylePageNumber = {
    backgroundColor: "#D9D9D9",
    color: "#000000",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "5px",
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <p className="fs-5 m-0">Tổng trang: {props.totalPage}</p>

      <div className="d-flex align-items-center gap-2">
        <button style={stylePrePage} className="btn-custom" onClick={props.onClickPrePage}>
          Trước
        </button>
        <div
          className="d-flex justify-content-center align-items-center"
          style={stylePageNumber}
        >
          <p className="mb-0 fs-5 fw-bold">{props.pageNumber}</p>
        </div>
        <button
          style={styleNextPage}
          className="btn-custom"
          onClick={props.onClickNextPage}
        >
          Sau
        </button>
      </div>
    </div>
  );
};
