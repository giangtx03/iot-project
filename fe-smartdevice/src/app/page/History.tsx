import React, { useEffect, useState } from "react";
import { SearchBox } from "../comp/SearchBox";
import { Paging } from "../comp/Paging";
import { DeviceHistory } from "../model/DeviceHistory";
import { formatDate, translateDeviceName } from "../util/AppUtil";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useAppDispatch } from "../store/hooks";
import { showOrHideSpinner } from "../reducer/SpinnerSlice";
import { DeviceHistoryService } from "../service/DeviceHistoryService";

type SearchModel = {
  keyword: string;
  sortBy: string;
  sortOrder: string;
  pageSize: number;
  pageNumber: number;
  timer: number;
};

export const History = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<DeviceHistory[]>([
  //   { id: 1, name: "Device 1", action: "Turn on", time: new Date().toString() },
  //   { id: 2, name: "Device 2", action: "Turn on", time: new Date().toString() },
  //   { id: 3, name: "Device 3", action: "Turn on", time: new Date().toString() },
  //   { id: 4, name: "Device 4", action: "Turn on", time: new Date().toString() },
  //   { id: 5, name: "Device 5", action: "Turn on", time: new Date().toString() },
  //   { id: 6, name: "Device 6", action: "Turn on", time: new Date().toString() },
  //   { id: 7, name: "Device 7", action: "Turn on", time: new Date().toString() },
  //   { id: 8, name: "Device 8", action: "Turn on", time: new Date().toString() },
  //   { id: 9, name: "Device 9", action: "Turn on", time: new Date().toString() },
  //   {
  //     id: 10,
  //     name: "Device 6",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 11,
  //     name: "Device 7",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 12,
  //     name: "Device 8",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 13,
  //     name: "Device 9",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 14,
  //     name: "Device 6",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 15,
  //     name: "Device 5",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 16,
  //     name: "Device 6",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 17,
  //     name: "Device 7",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 18,
  //     name: "Device 8",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  //   {
  //     id: 19,
  //     name: "Device 9",
  //     action: "Turn on",
  //     time: new Date().toString(),
  //   },
  ]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchModel, setSearchModel] = useState<SearchModel>({
    keyword: "",
    sortBy: "id",
    sortOrder: "desc",
    pageSize: 10,
    pageNumber: 1,
    timer: 0,
  });

  useEffect(() => {
    dispatch(showOrHideSpinner(true));
    const fetchApi = async () => {
      await DeviceHistoryService.getInstance()
        .getDeviceHistory({
          keyword: searchModel.keyword,
          sortBy: searchModel.sortBy,
          sortOrder: searchModel.sortOrder,
          pageSize: searchModel.pageSize,
          pageNumber: searchModel.pageNumber,
        })
        .then((response) => {
          console.log(response);
          if (response.data.httpCode === 200) {
            setData(response.data.data);
            setTotalPage(response.data.totalPages);
            dispatch(showOrHideSpinner(false));
          }
        });
    };
    fetchApi();
  }, [searchModel.timer]);

  const onClickBtnSearch = () => {
    setSearchModel({ ...searchModel, timer: Date.now() });
  };

  const onChangeSearchInput = (e: any) => {
    setSearchModel({ ...searchModel, keyword: e.target.value});
  };

  const onChangePageSize = (e: any) => {
    setSearchModel({ ...searchModel, pageSize: e.target.value, timer: Date.now() });
  };

  const onClickNextPage = () => {
    if(searchModel.pageNumber >= totalPage) return;
    setSearchModel((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
      timer: Date.now(),
    }));
  };

  const onClickPrePage = () => {
    if(searchModel.pageNumber <= 1) return;
    setSearchModel((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber - 1,
      timer: Date.now(),
    }));
  };

  const handleSort = (sortBy: string) => {
    setSearchModel((prev) => ({
      ...prev,
      sortBy: sortBy,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
      timer: Date.now(),
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
              onClickBtnSearch={onClickBtnSearch}
              hideSelect={true}
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
              <div className="mb-2" style={{ height: "650px", overflowY: "auto" }}>
                <table className="table table-bordered text-center">
                  <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                    <tr>
                      <th
                        onClick={() => handleSort("id")}
                        className="cursor-pointer"
                      >
                        ID {searchModel.sortBy === "id" ? (searchModel.sortOrder === 'asc' ? <FaAngleUp /> : <FaAngleDown />)  : null}
                      </th>
                      <th
                        onClick={() => handleSort("name")}
                        className="cursor-pointer"
                      >
                        Tên thiết bị {searchModel.sortBy === "name" ? (searchModel.sortOrder === 'asc' ? <FaAngleUp /> : <FaAngleDown />)  : null}
                      </th>
                      <th
                        onClick={() => handleSort("action")}
                        className="cursor-pointer"
                      >
                        Hành động {searchModel.sortBy === "action" ? (searchModel.sortOrder === 'asc' ? <FaAngleUp /> : <FaAngleDown />)  : null}
                      </th>
                      <th
                        onClick={() => handleSort("time")}
                        className="cursor-pointer"
                      >
                        Thời gian {searchModel.sortBy === "time" ? (searchModel.sortOrder === 'asc' ? <FaAngleUp /> : <FaAngleDown />)  : null}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{translateDeviceName(item.name)}</td>
                        <td>{item.action ? "Bật" : "Tắt"}</td>
                        <td>{formatDate(item.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Paging
                pageNumber={searchModel.pageNumber}
                totalPage={totalPage}
                onClickNextPage={onClickNextPage}
                onClickPrePage={onClickPrePage}
                onChangePageSize={onChangePageSize}
                pageSize={searchModel.pageSize}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
