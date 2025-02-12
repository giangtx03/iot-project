import React, { useState } from "react";
import { SearchBox } from "../comp/SearchBox";
import { Paging } from "../comp/Paging";
import { SensorData } from "../model/SensorData";
import { formatDate } from "../util/DateTimeFormat";

type SearchModel = {
  keyword: string;
  time: string;
  sortBy: string;
  sortOrder: string;
  timer: number;
};

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
      id: 6,
      humidity: 50,
      temperature: 30,
      light_level: 100,
      time: new Date().toString(),
    },
    {
      id: 7,
      humidity: 55,
      temperature: 28,
      light_level: 120,
      time: new Date().toString(),
    },
    {
      id: 8,
      humidity: 60,
      temperature: 32,
      light_level: 90,
      time: new Date().toString(),
    },
    {
      id: 9,
      humidity: 65,
      temperature: 29,
      light_level: 110,
      time: new Date().toString(),
    },
    {
      id: 10,
      humidity: 70,
      temperature: 31,
      light_level: 95,
      time: new Date().toString(),
    },
    {
      id: 11,
      humidity: 50,
      temperature: 30,
      light_level: 100,
      time: new Date().toString(),
    },
    {
      id: 12,
      humidity: 55,
      temperature: 28,
      light_level: 120,
      time: new Date().toString(),
    },
    {
      id: 13,
      humidity: 60,
      temperature: 32,
      light_level: 90,
      time: new Date().toString(),
    },
    {
      id: 14,
      humidity: 65,
      temperature: 29,
      light_level: 110,
      time: new Date().toString(),
    },
  ]);
  const [searchModel, setSearchModel] = useState<SearchModel>({
    keyword: "",
    time: "",
    sortBy: "",
    sortOrder: "",
    timer: 0,
  });

  const onChangeSearchInput = (e: any) => {
    console.log(e.target.value);
    setSearchModel({ ...searchModel, keyword: e.target.value });
  };

  const onChangeDateInput = (e: any) => {
    console.log(e.target.value);
    setSearchModel({ ...searchModel, time: e.target.value });
  };
  const onClickBtnSearch = () => {
    console.log("Click");
    console.log(searchModel);
  };

  const onClickNextPage = () => {
    console.log("Next Page");
    setPageNumber(pageNumber + 1);
  };

  const onClickPrePage = () => {
    console.log("Pre Page");
    setPageNumber(pageNumber - 1);
  };

  const handleSort = (sortBy: string) => {
    console.log("Sort by: ", sortBy);
  
    setSearchModel((prev) => ({
      ...prev,
      sortBy: sortBy,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));

    console.log(searchModel)
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
                    <th
                      onClick={() => handleSort('id')}
                      className="cursor-pointer"
                    >
                      ID
                    </th>
                    <th
                      onClick={() => handleSort('humidity')}
                      className="cursor-pointer"
                    >
                      Độ ẩm (%)
                    </th>
                    <th
                      onClick={() => handleSort('temperature')}
                      className="cursor-pointer"
                    >
                      Nhiệt độ (°C)
                    </th>
                    <th
                      onClick={() => handleSort('light_level')}
                      className="cursor-pointer"
                    >
                      Mức ánh sáng (lux)
                    </th>
                    <th
                      onClick={() => handleSort('time')}
                      className="cursor-pointer"
                    >
                      Thời gian
                    </th>
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
