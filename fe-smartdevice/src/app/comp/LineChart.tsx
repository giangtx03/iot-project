import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { formatDate } from "../util/AppUtil";

Chart.register(...registerables, zoomPlugin);

export const LineChart = (props : any) => {

  const data = {
    labels: props.sensorData.map((data:any) => formatDate(data.time)),
    datasets: [
      {
        label: "Nhiệt độ (°C)",
        data: props.sensorData.map((data:any) => data.temperature),
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Độ ẩm (%)",
        data: props.sensorData.map((data:any) => data.humidity),
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Mức ánh sáng (lux)",
        data: props.sensorData.map((data:any) => data.lightLevel),
        borderColor: "orange",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x" as const,
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};
