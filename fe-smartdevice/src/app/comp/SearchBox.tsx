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
        {props.hideSelect ? null : (
          <div>
            <select value={props.searchModel.type} onChange={props.onChangeType} className="form-select w-auto border-0" name="type">
              <option value="all">
                Tất cả
              </option>
              <option value="id">ID</option>
              <option value="humidity">Độ ẩm</option>
              <option value="temperature">Nhiệt độ</option>
              <option value="light">Ánh sáng</option>
              <option value="time">Thời gian</option>
            </select>
          </div>
        )}
        <button
          className="btn btn-primary w-25"
          onClick={props.onClickBtnSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};
