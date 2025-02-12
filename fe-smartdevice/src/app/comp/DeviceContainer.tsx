import React from "react";
import fan from "../../asset/image/fan.png";
import light from "../../asset/image/light.png";
import hud from "../../asset/image/hud.png";

export const DeviceContainer = (props: any) => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3 h-100">
        <div className="d-flex flex-column align-items-center">
          <img src={fan} alt="Fan Icon" />
          <button
            onClick={() => props.onClick("fan")}
            className={props.fan ? " btn-action mt-2" : "active btn-action mt-2"}
          >
            {props.fan ? "Tắt" : "Bật"}
          </button>
        </div>
        <hr
          style={{ width: "100%" }}
          className="ms-2 border border-3 border-white"
        />
        <div className="d-flex flex-column align-items-center">
          <img src={light} alt="Light Icon" />
          <button
            onClick={() => props.onClick("bulb")}
            className={
              props.bulb ? " btn-action mt-2" : "active btn-action mt-2"
            }
          >
            {props.bulb ? "Tắt" : "Bật"}
          </button>
        </div>
        <hr
          style={{ width: "100%" }}
          className="ms-2 border border-3 border-white"
        />
        <div className="d-flex flex-column align-items-center">
          <img src={hud} alt="Humidity Icon" />
          <button
            onClick={() => props.onClick("dehumidifier")}
            className={
              props.dehumidifier ? " btn-action mt-2" : "active btn-action mt-2"
            }
          >
            {props.dehumidifier ? "Tắt" : "Bật"}
          </button>
        </div>
      </div>
    </>
  );
};
