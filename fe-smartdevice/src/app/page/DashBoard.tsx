import React, { useEffect, useState } from "react";
import tempIcon from "../../asset/image/temp-icon.png";
import sunIcon from "../../asset/image/sun-icon.png";
import hudIcon from "../../asset/image/hud-icon.png";
import { LineChart } from "../comp/LineChart";
import { DeviceContainer } from "../comp/DeviceContainer";
import { SensorData } from "../model/SensorData";
import { SensorDataService } from "../service/SensorDataService";
import { useAppDispatch } from "../store/hooks";
import { showOrHideSpinner } from "../reducer/SpinnerSlice";
import { DeviceHistoryService } from "../service/DeviceHistoryService";
import { DeviceHistory } from "../model/DeviceHistory";
import { WebSocketService } from "../service/WebSocketService";

export const DashBoard = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<SensorData[]>([]);
  const [sensorDataPresent, setSensorDataPresent] = useState({
    temperature: 0,
    humidity: 0,
    lightLevel: 0,
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
          sortOrder: "asc",
          pageSize: 24,
          pageNumber: 1,
          type: "all",
        })
        .then((response) => {
          if (response.data.httpCode === 200) {
            setData(response.data.data);
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
    WebSocketService.getInstance()
    .subscribe("/topic/sensor-data", (payload: any) =>{
      const dataSensor: SensorData = JSON.parse(payload);
      setSensorDataPresent(dataSensor);
      setData((prev) => [...prev, dataSensor]);

    });    
  },[])

  const handleDeviceToggle = (device: keyof typeof devices) => {
    setDevices((prevDevices) => {
      const newState = !prevDevices[device];

      dispatch(showOrHideSpinner(true));

      DeviceHistoryService.getInstance()
        .createDeviceHistory({
          name: device,
          action: newState,
        })
        .then((response) => {
          dispatch(showOrHideSpinner(false));
        });

      return { ...prevDevices, [device]: newState };
    });
  };

  return (
    <div className="container p-0 pe-3">
      <div className="row mt-3 mx-4 pe-2 d-flex justify-content-around gap-2 flex-nowrap">
        <div className="col-4 temperature-box rounded pt-1 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={tempIcon} alt="temperature icon" />
            <p className="py-3 m-0 fs-3">Nhiệt độ {"(°C)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.temperature}</p>
        </div>

        <div className="col-4 humidity-box rounded pt-2 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={hudIcon} alt="humidity icon" />
            <p className="py-3 m-0 fs-3">Độ ẩm {"(%)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.humidity}</p>
        </div>

        <div className="col-4 light-box rounded pt-2 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={sunIcon} alt="light level icon" />
            <p className="py-3 m-0 fs-3">Ánh sáng {"(lux)"}</p>
          </div>
          <p className="fs-1">{sensorDataPresent.lightLevel}</p>
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

        <div
          className="col-2 rounded p-2"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <DeviceContainer
            fan={devices.fan}
            dehumidifier={devices.dehumidifier}
            bulb={devices.bulb}
            onClick={handleDeviceToggle}
          />
        </div>
      </div>
    </div>
  );
};
