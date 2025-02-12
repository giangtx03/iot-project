import React, { useState } from "react";
import { SearchBox } from "../comp/SearchBox";
import { Paging } from "../comp/Paging";
import { DeviceHistory } from "../model/DeviceHistory";
import { formatDate } from "../util/DateTimeFormat";

type SearchModel = {
  keyword: string;
  time: string;
  sortBy: string;
  sortOrder: string;
  timer: number;
};

export const History = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<DeviceHistory[]>([
    { id: 1, name: "Device 1", action: "Turn on", time: new Date().toString() },
    { id: 2, name: "Device 2", action: "Turn on", time: new Date().toString() },
    { id: 3, name: "Device 3", action: "Turn on", time: new Date().toString() },
    { id: 4, name: "Device 4", action: "Turn on", time: new Date().toString() },
    { id: 5, name: "Device 5", action: "Turn on", time: new Date().toString() },
    { id: 6, name: "Device 6", action: "Turn on", time: new Date().toString() },
    { id: 7, name: "Device 7", action: "Turn on", time: new Date().toString() },
    { id: 8, name: "Device 8", action: "Turn on", time: new Date().toString() },
    { id: 9, name: "Device 9", action: "Turn on", time: new Date().toString() },
    {
      id: 10,
      name: "Device 6",
      action: "Turn on",
      time: new Date().toString(),
    },
    {
      id: 11,
      name: "Device 7",
      action: "Turn on",
      time: new Date().toString(),
    },
    {
      id: 12,
      name: "Device 8",
      action: "Turn on",
      time: new Date().toString(),
    },
    {
      id: 13,
      name: "Device 9",
      action: "Turn on",
      time: new Date().toString(),
    },
    {
      id: 14,
      name: "Device 6",
      action: "Turn on",
      time: new Date().toString(),
    },
  ]);
  const [searchModel, setSearchModel] = useState<SearchModel>({
    keyword: "",
    time: "",
    sortBy: "",
    sortOrder: "",
    timer: 0
  });
  const onClickBtnSearch = () => {
    setSearchModel({ ...searchModel, timer: Date.now() });
  };

  const onChangeSearchInput = (e: any) => {
    setSearchModel({ ...searchModel, keyword: e.target.value });
  };
  
  const onChangeDateInput = (e: any) => {
    setSearchModel({ ...searchModel, time: e.target.value });
  };

  const onClickNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const onClickPrePage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleSort = (sortBy: string) => {
    setSearchModel((prev) => ({
      ...prev,
      sortBy: sortBy,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container p-0">
      <div
        className="row m-3 me-5 rounded"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="col-12">
          <h3 className="mt-2">Lịch sử hoạt động</h3>
          <div className="mt-3">
            <SearchBox
              searchModel={searchModel}
              onChangeSearchInput={onChangeSearchInput}
              onChangeDateInput={onChangeDateInput}
              onClickBtnSearch={onClickBtnSearch}
            />
          </div>
          {data.length === 0 ? (
            <div className="p-2 my-3">
              <p className="fs-5">Không có dữ liệu</p>
            </div>
          ) : (
            <div
              style={{ backgroundColor: "#FFFFFF" }}
              className="p-2 my-3 rounded"
            >
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')}
                      className="cursor-pointer">ID</th>
                    <th onClick={() => handleSort('name')}
                      className="cursor-pointer">Tên thiết bị</th>
                    <th onClick={() => handleSort('action')}
                      className="cursor-pointer">Hành động</th>
                    <th onClick={() => handleSort('time')}
                      className="cursor-pointer">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.action}</td>
                      <td>{formatDate(item.time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Paging
                pageNumber={pageNumber}
                totalPage={10}
                onClickNextPage={onClickNextPage}
                onClickPrePage={onClickPrePage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
