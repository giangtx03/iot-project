
export const SearchBox = (props: any) => {
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

        <button className="btn btn-primary w-25" onClick={props.onClickBtn}>
          Tìm kiếm
        </button>
      </div>
      <div className="ms-auto">
        <input
          value={props.searchModel.time}
          onChange={props.onChangeDateInput}
          type="datetime-local"
          className="form-control w-auto"
          placeholder="Chọn ngày giờ"
        />
      </div>
    </div>
  );
};
