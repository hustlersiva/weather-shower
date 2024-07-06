import React from "react";
import { getWeatherIcon } from "../assets/util";
import { images } from "../assets/assest";

const CurrentData = ({ weatherData }) => {
  return (
    <>
      {weatherData && (
        <div className="flex flex-col items-center">
          <img
            className="size-36 mb-4 hover:size-[146px]"
            src={getWeatherIcon(weatherData.weather[0].main)}
            alt="Weather Icon"
          />
          <div className="text-5xl font-bold mb-2">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="text-2xl mb-2 font-semibold">{weatherData.name}</div>
          <div className="flex justify-center w-full gap-10 my-10">
            <div className="flex items-center justify-center gap-2 w-[50%]">
              <img
                src={images.humidity}
                alt="Humidity"
                className="size-14 mr-2 hover:size-[58px]"
              />
              <div className="text-2xl font-bold">
                {weatherData.main.humidity}%
              </div>
            </div>
            <div className="flex items-center gap-2 w-[50%]">
              <img
                src={images.wind}
                alt="Wind Speed"
                className="size-14 mr-2 hover:size-[58px]"
              />
              <div className="text-2xl font-bold">
                {weatherData.wind.speed} Km/h
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentData;
