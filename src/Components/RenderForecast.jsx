import React from "react";
import { getWeatherIcon } from "../assets/util";

const RenderForecast = ({ ...forecastData }) => {
  if (!forecastData || !Array.isArray(forecastData.list)) {
    console.log("No forecast data available");
    return null;
  }

  // Extracting 7 days forecast data from the 5 days data with 3-hour intervals
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

  return (
    <>
      {dailyForecast.map((day, index) => (
        <div
          key={index}
          className="sm:flex sm:flex-col mx-auto  w-[50%] items-center pl-[70px]  gap-2 sm:mx-2 p-3  border-2 hover:shadow-2xl hover:shadow-teal-950 font-roboto sm:border-2 rounded-md border-black  sm:p-5"
        >
          <div className="font-roboto font-black text-xl">
            {new Date(day.dt * 1000).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <img
            src={getWeatherIcon(day.weather[0].main)}
            alt="Weather Icon"
            className="size-14 mb-2 hover:size-[58px]"
          />
          <div className="text-lg font-normal">
            {Math.round(day.main.temp)}°C
          </div>
          <div className="font-roboto font-semibold text-lg">
            {new Date(day.dt * 1000).toLocaleDateString("en-GB", {
              weekday: "long",
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderForecast;
