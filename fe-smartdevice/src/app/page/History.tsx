import React, { useState } from "react";
import { SearchBox } from "../comp/SearchBox";
import { Paging } from "../comp/Paging";
import { DeviceHistory } from "../model/DeviceHistory";
import { formatDate } from "../util/DateTimeFormat";

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
    { id: 10, name: "Device 6", action: "Turn on", time: new Date().toString() },
    { id: 11, name: "Device 7", action: "Turn on", time: new Date().toString() },
    { id: 12, name: "Device 8", action: "Turn on", time: new Date().toString() },
    { id: 13, name: "Device 9", action: "Turn on", time: new Date().toString() },
    { id: 14, name: "Device 6", action: "Turn on", time: new Date().toString() },
  ]);

  const onClickBtn = () => {
    console.log("Click");
  };

  const onClickNextPage = () => {
    console.log("Next Page");
    setPageNumber(pageNumber + 1);
  };

  const onClickPrePage = () => {
    console.log("Pre Page");
    setPageNumber(pageNumber - 1);
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
            <SearchBox onClickBtn={onClickBtn} />
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
                    <th>ID</th>
                    <th>Tên thiết bị</th>
                    <th>Hành động</th>
                    <th>Thời gian</th>
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
