import React, { useState } from "react";
import tempIcon from "../../asset/image/temp-icon.png";
import sunIcon from "../../asset/image/sun-icon.png";
import hudIcon from "../../asset/image/hud-icon.png";
import { LineChart } from "../comp/LineChart";
import { DeviceContainer } from "../comp/DeviceContainer";

export const DashBoard = () => {
  const sensorData = [
    { time: "00:00", temperature: 24, humidity: 85, light_level: 10 },
    { time: "01:00", temperature: 23, humidity: 87, light_level: 5 },
    { time: "02:00", temperature: 22, humidity: 89, light_level: 3 },
    { time: "03:00", temperature: 21, humidity: 90, light_level: 2 },
    { time: "04:00", temperature: 20, humidity: 91, light_level: 1 },
    { time: "05:00", temperature: 20, humidity: 92, light_level: 2 },
    { time: "06:00", temperature: 21, humidity: 90, light_level: 50 },
    { time: "07:00", temperature: 23, humidity: 85, light_level: 200 },
    { time: "08:00", temperature: 25, humidity: 80, light_level: 300 },
    { time: "09:00", temperature: 27, humidity: 75, light_level: 500 },
    { time: "10:00", temperature: 29, humidity: 70, light_level: 500 },
    { time: "11:00", temperature: 31, humidity: 65, light_level: 500 },
    { time: "12:00", temperature: 32, humidity: 60, light_level: 700 },
    { time: "13:00", temperature: 33, humidity: 58, light_level: 750 },
    { time: "14:00", temperature: 34, humidity: 55, light_level: 720 },
    { time: "15:00", temperature: 33, humidity: 57, light_level: 680 },
    { time: "16:00", temperature: 32, humidity: 60, light_level: 500 },
    { time: "17:00", temperature: 30, humidity: 65, light_level: 300 },
    { time: "18:00", temperature: 28, humidity: 70, light_level: 100 },
    { time: "19:00", temperature: 26, humidity: 75, light_level: 50 },
    { time: "20:00", temperature: 25, humidity: 78, light_level: 50 },
    { time: "21:00", temperature: 24, humidity: 80, light_level: 50 },
    { time: "22:00", temperature: 23, humidity: 82, light_level: 20 },
    { time: "23:00", temperature: 22, humidity: 85, light_level: 10 },
  ];

  const [devices, setDevices] = useState({
    fan: false,
    dehumidifier: true,
    bulb: false,
  });

  const handleDeviceToggle = (device: keyof typeof devices) => {
    setDevices((prevDevices) => ({
      ...prevDevices,
      [device]: !prevDevices[device],
    }));
  };

  return (
    <div className="container p-0 pe-3">
      <div className="row mt-3 mx-4 pe-2 d-flex justify-content-around gap-2 flex-nowrap">
        <div className="col-4 temperature-box rounded pt-1 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={tempIcon} alt="temperature icon" />
            <p className="py-3 m-0 fs-3">Nhiệt độ {"(°C)"}</p>
          </div>
          <p className="fs-1">29</p>
        </div>

        <div className="col-4 humidity-box rounded pt-2 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={hudIcon} alt="humidity icon" />
            <p className="py-3 m-0 fs-3">Độ ẩm {"(%)"}</p>
          </div>
          <p className="fs-1">90</p>
        </div>

        <div className="col-4 light-box rounded pt-2 px-2 mx-0 d-flex flex-column align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <img src={sunIcon} alt="light level icon" />
            <p className="py-3 m-0 fs-3">Ánh sáng {"(lux)"}</p>
          </div>
          <p className="fs-1">100</p>
        </div>
      </div>
      <div className="row mt-2 mx-4 d-flex justify-content-around gap-2 flex-nowrap">
        <div
          className="col-10 rounded p-2"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <h2 className="mt-2">Biểu đồ biến động</h2>
          <div className="chart-container">
            <LineChart sensorData={sensorData} />
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
