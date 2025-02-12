import { useEffect, useState } from "react";

export const SearchBox = (props: any) => {

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

    setMaxDate(localDate);
  }, []);

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex gap-2" style={{ width: "40%" }}>
        <input
          type="text"
          value={props.searchModel.keyword}
          onChange={props.onChangeSearchInput}
          className="form-control ms-2 border-0 border-bottom border-2 border-dark rounded-0 shadow-none focus-ring"
          placeholder="Nhập nội dung..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onClickBtn();
            }
          }}
        />

        <button className="btn btn-primary w-25" onClick={props.onClickBtnSearch}>
          Tìm kiếm
        </button>
      </div>
      <div className="ms-auto">
        <input
          value={props.searchModel.time}
          onChange={props.onChangeDateInput}
          type="datetime-local"
          max={maxDate}
          className="form-control w-auto"
          placeholder="Chọn ngày giờ"
        />
      </div>
    </div>
  );
};
