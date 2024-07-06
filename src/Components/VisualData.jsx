import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VisualData = ({ ...forecastData }) => {
  if (!forecastData) return null;
  const [chartType, setChartType] = useState("line");

  const dailyForecast = forecastData.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).getDate();
    if (!acc.some((item) => new Date(item.dt * 1000).getDate() === date)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  // Ensure we have 7 days of forecast data
  while (dailyForecast.length < 6) {
    dailyForecast.push(dailyForecast[dailyForecast.length - 1]);
  }

  const labels = dailyForecast.map((day) =>
    new Date(day.dt * 1000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  const series = [
    {
      name: "Temperature (°C)",
      data: dailyForecast.map((day) => day.main.temp),
    },
  ];

  const options = {
    chart: {
      type: chartType,
      chart: {
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1100,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 500,
          },
        },
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: labels,
      labels: {
        style: {
          fontSize: "14px", // Adjust as needed
          fontWeight: 600, // Adjust as needed
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px", // Adjust as needed
          fontWeight: 600, // Adjust as needed
        },
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#121212"], // Change line color here
    },
    title: {
      text: "Daily Temperature",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#121212",
      },
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type={chartType}
        height={400}
        width={400}
      />
      <div className="flex items-center justify-evenly gap-2  mb-2">
        <button
          className={`animated-bg px-4 py-1 rounded-full ${
            chartType === "bar"
              ? "bg-gradient-to-r from-teal-700 to-orange-500"
              : "bg-teal-700"
          } text-lg font-semibold`}
          onClick={() => setChartType("bar")}
        >
          Bar
        </button>
        <button
          className={`animated-bg px-4 py-1 rounded-full ${
            chartType === "line"
              ? "bg-gradient-to-r from-teal-700 to-orange-500"
              : "bg-teal-700"
          } text-lg font-semibold`}
          onClick={() => setChartType("line")}
        >
          Line
        </button>

        <button
          className={`animated-bg px-4 py-1 rounded-full ${
            chartType === "area"
              ? "bg-gradient-to-r from-teal-700 to-orange-500"
              : "bg-teal-700"
          } text-lg font-semibold`}
          onClick={() => setChartType("area")}
        >
          Area
        </button>
      </div>
    </>
  );
};

export default VisualData;
