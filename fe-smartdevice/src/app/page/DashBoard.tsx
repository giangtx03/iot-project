import React, { useEffect, useState } from "react";
import tempIcon from "../../asset/image/temp-icon.png";
import sunIcon from "../../asset/image/sun-icon.png";
import hudIcon from "../../asset/image/hud-icon.png";
import { LineChart } from "../comp/LineChart";
import fan from "../../asset/image/fan.png";
import light from "../../asset/image/light.png";
import hud from "../../asset/image/hud.png";
import { SensorData } from "../model/SensorData";
import { SensorDataService } from "../service/SensorDataService";
import { useAppDispatch } from "../store/hooks";
import { showOrHideSpinner } from "../reducer/SpinnerSlice";
import { DeviceHistoryService } from "../service/DeviceHistoryService";
import { DeviceHistory } from "../model/DeviceHistory";
import { WebSocketService } from "../service/WebSocketService";
import { parseISOToArray } from "../util/AppUtil";
import { LineChart2 } from "../comp/LineChart2";

export const DashBoard = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<SensorData[]>([]);
  const [sensorDataPresent, setSensorDataPresent] = useState({
    temperature: 0,
    humidity: 0,
    lightLevel: 0,
    // dust: 0,
    windSpeed: 0,
  });

  const [devices, setDevices] = useState({
    fan: false,
    dehumidifier: false,
    bulb: false,
  });

  useEffect(() => {
    dispatch(showOrHideSpinner(true));
    const fetchApiDeviceStatus = async () => {
      await DeviceHistoryService.getInstance()
        .getActionDevices()
        .then((response) => {
          setDevices((prevDevices) => {
            const updatedDevices = { ...prevDevices };
            response.data.data.forEach((device: DeviceHistory) => {
              if (device.name in updatedDevices) {
                updatedDevices[device.name as keyof typeof devices] =
                  device.action;
              }
            });
            return updatedDevices;
          });
        });
    };
    fetchApiDeviceStatus();
    dispatch(showOrHideSpinner(false));
  }, []);

  useEffect(() => {
    dispatch(showOrHideSpinner(true));
    const fetchApiSensorData = async () => {
      await SensorDataService.getInstance()
        .getSensorData({
          keyword: "",
          sortBy: "id",
          sortOrder: "desc",
          pageSize: 50,
          pageNumber: 1,
          type: "all",
        })
        .then((response) => {
          if (response.data.httpCode === 200) {
            setData(response.data.data.reverse());
            console.log(response.data.data)
            setSensorDataPresent(
              response.data.data[response.data.data.length - 1]
            );
          }
        });
    };
    fetchApiSensorData();
    dispatch(showOrHideSpinner(false));
  }, [])

  useEffect(() => {
    WebSocketService.getInstance().subscribe(
      "/topic/sensor-data",
      (payload: any) => {
        const dataSensor: SensorData = JSON.parse(payload);
        setSensorDataPresent(dataSensor);
        setData((prev) => {
          const updated = [...prev, dataSensor];
          return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
        });
      }
    );
  }, []);
  

  const handleDeviceToggle = async (device: keyof typeof devices) => {
    const newState = !devices[device];
  
    dispatch(showOrHideSpinner(true));
    
    
    DeviceHistoryService.getInstance()
    .createDeviceHistory({
      name: device,
      action: newState,
    });
    WebSocketService.getInstance().subscribe(
      "/topic/device-status",
      (payload: any) => {
        const parsed = JSON.parse(payload);
        const { device, status } = parsed;
        setDevices((prev) => ({
          ...prev,
          [device]: status,
        }));
  
        dispatch(showOrHideSpinner(false));
      }
    );
  };
  

  return (
    <div className="container p-0 pe-3">
      <div className="row mt-3 mx-4 pe-2 d-flex justify-content-around gap-2 flex-nowrap">
        <div className="col temperature-box rounded pt-1 px-2 mx-2 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={tempIcon} alt="temperature icon" />
            <p className="py-3 m-0 fs-3">Nhiệt độ {"(°C)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.temperature}</p>
        </div>

        <div className="col humidity-box rounded pt-2 px-2 mx-2 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={hudIcon} alt="humidity icon" />
            <p className="py-3 m-0 fs-3">Độ ẩm {"(%)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.humidity}</p>
        </div>

        <div className="col light-box rounded pt-2 px-2 mx-2 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={sunIcon} alt="light level icon" />
            <p className="py-3 m-0 fs-3">Ánh sáng {"(lux)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.lightLevel}</p>
        </div>

        {/* <div className="col light-box rounded pt-2 px-2 mx-2 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <p className="py-3 m-0 fs-3">Độ bụi {"(mg/m3)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.dust}</p>
        </div> */}

        <div className="col light-box rounded pt-2 px-2 mx-2 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <p className="py-3 m-0 fs-3">Tốc độ gió {"(m/s)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.windSpeed}</p>
        </div>
      </div>
      <div className="row mt-2 mx-4 d-flex justify-content-around gap-2 flex-nowrap">
        <div
          className="col-10 rounded p-2"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <h2 className="mt-2">Biểu đồ biến động</h2>
          <div className="chart-container">
            <LineChart sensorData={data} />
          </div>
        </div>

        {/* <div
          className="col-5 rounded p-2"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <h2 className="mt-2">Biểu đồ biến động(Độ bụi, Tốc độ gió)</h2>
          <div className="chart-container">
            <LineChart2 sensorData={data} />
          </div>
        </div> */}

        <div
          className="col-2 rounded p-2"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <>
                <div
            className="d-flex flex-column align-items-center justify-content-between gap-3 h-100"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <div className="d-flex align-items-center">
              <img src={fan} alt="Fan Icon" />
              <button
                onClick={() => handleDeviceToggle("fan")}
                className={devices.fan ? "btn-action mt-2" : "active btn-action mt-2"}
              >
                {devices.fan ? "Tắt" : "Bật"}
              </button>
            </div>

            <hr style={{ width: "100%" }} className="ms-2 border border-3 border-white" />

            <div className="d-flex align-items-center">
              <img src={light} alt="Light Icon" />
              <button
                onClick={() => handleDeviceToggle("bulb")}
                className={devices.bulb ? "btn-action mt-2" : "active btn-action mt-2"}
              >
                {devices.bulb ? "Tắt" : "Bật"}
              </button>
            </div>

            <hr style={{ width: "100%" }} className="ms-2 border border-3 border-white" />

            <div className="d-flex align-items-center">
              <img src={hud} alt="Humidity Icon" />
              <button
                onClick={() => handleDeviceToggle("dehumidifier")}
                className={
                  devices.dehumidifier ? "btn-action mt-2" : "active btn-action mt-2"
                }
              >
                {devices.dehumidifier ? "Tắt" : "Bật"}
              </button>
            </div>

            <hr style={{ width: "100%" }} className="ms-2 border border-3 border-white" />

            <div
              className={`d-flex align-items-center p-4 ${
                sensorDataPresent.windSpeed > 60 ? "flash-warning" : ""
              }`}
            >
              <img src={light} alt="Warning Icon" />
            </div>
          </div>
              </>
        </div>
      </div>
    </div>
  );
};
