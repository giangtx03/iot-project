import React, { useState } from "react";
import { SearchBox } from "../comp/SearchBox";
import { Paging } from "../comp/Paging";
import { SensorData } from "../model/SensorData";
import { formatDate } from "../util/DateTimeFormat";

export const Statistics = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<SensorData[]>([
    {
      id: 1,
      humidity: 50,
      temperature: 30,
      light_level: 100,
      time: new Date().toString(),
    },
    {
      id: 2,
      humidity: 55,
      temperature: 28,
      light_level: 120,
      time: new Date().toString(),
    },
    {
      id: 3,
      humidity: 60,
      temperature: 32,
      light_level: 90,
      time: new Date().toString(),
    },
    {
      id: 4,
      humidity: 65,
      temperature: 29,
      light_level: 110,
      time: new Date().toString(),
    },
    {
      id: 5,
      humidity: 70,
      temperature: 31,
      light_level: 95,
      time: new Date().toString(),
    },
    {
      id: 1,
      humidity: 50,
      temperature: 30,
      light_level: 100,
      time: new Date().toString(),
    },
    {
      id: 2,
      humidity: 55,
      temperature: 28,
      light_level: 120,
      time: new Date().toString(),
    },
    {
      id: 3,
      humidity: 60,
      temperature: 32,
      light_level: 90,
      time: new Date().toString(),
    },
    {
      id: 4,
      humidity: 65,
      temperature: 29,
      light_level: 110,
      time: new Date().toString(),
    },
    {
      id: 5,
      humidity: 70,
      temperature: 31,
      light_level: 95,
      time: new Date().toString(),
    },
    {
      id: 1,
      humidity: 50,
      temperature: 30,
      light_level: 100,
      time: new Date().toString(),
    },
    {
      id: 2,
      humidity: 55,
      temperature: 28,
      light_level: 120,
      time: new Date().toString(),
    },
    {
      id: 3,
      humidity: 60,
      temperature: 32,
      light_level: 90,
      time: new Date().toString(),
    },
    {
      id: 4,
      humidity: 65,
      temperature: 29,
      light_level: 110,
      time: new Date().toString(),
    },
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
          <h3 className="mt-2">Thống kê</h3>
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
                    <th>Độ ẩm (%)</th>
                    <th>Nhiệt độ (°C)</th>
                    <th>Mức ánh sáng (lux)</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.humidity}</td>
                      <td>{item.temperature}</td>
                      <td>{item.light_level}</td>
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
