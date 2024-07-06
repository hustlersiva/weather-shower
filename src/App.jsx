import React, { useState, useEffect } from "react";

import axios from "axios";
import { MdOutlineSwipe } from "react-icons/md";

import RenderForecast from "./Components/RenderForecast";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import CurrentData from "./Components/CurrentData";
import VisualData from "./Components/VisualData";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "53ccb2e17ec5d22f68416143759f0728";
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&q=`;

  const checkWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(weatherApi + city);
      const forecastResponse = await axios.get(forecastApi + city);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setErrorMessage("");
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("City is not valid. Enter a valid city name.");
      setWeatherData(null);
      setForecastData(null);
      setShowResults(false);
    }
  };

  const handleSearchClick = () => {
    if (cityName.trim()) {
      checkWeather(cityName);
    } else {
      setErrorMessage("Please enter a valid city name.");
      setShowResults(false);
    }
    setCityName("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  console.log(errorMessage);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-700 to-orange-500 text-black font-roboto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-slate-900">
          Weather App
        </h1>
        <div className="flex justify-between sm:w-[25%] w-[70%] mb-4 ">
          <input
            onKeyDown={handleKeyDown}
            className="text-center w-full border-1 border-gray-300 bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-2 text-black text-lg outline-none font-bold placeholder:text-base placeholder:text-slate-900  placeholder:font-medium  "
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="ml-4 px-4 py-1 rounded-full bg-teal-700 bg-gradient-to-r from-teal-700 to-orange-600"
            onClick={handleSearchClick}
          >
            <FaSearch className="size-6 fill-gray-950" />
          </button>
        </div>

        {errorMessage ? (
          <div className="text-black text-[22px] font-semibold mb-4">
            {errorMessage}
          </div>
        ) : (
          showResults && (
            <>
              <div className=" flex items-center justify-around w-full max-w-[90%] mb-2">
                <div className="sm:block hidden animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl">
                  Weekly Forecast
                </div>
                <div className="sm:block hidden animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl">
                  Current data
                </div>
                <div className="sm:block hidden animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl">
                  Visual Forecast
                </div>
              </div>

              {/* hero */}
              <div className=" flex sm:flex-row flex-col items-center gap-x-7 rounded-2xl bg-clip-text shadow-md w-full max-w-[90%] p-4 sm:hover:shadow-2xl sm:hover:shadow-black gap-y-3 sm:mb-10 sm:mt-5">
                {/* weekly data */}
                <div className="sm:hidden block animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl ">
                  Weekly Forecast
                </div>
                <div className="sm:w-1/3 w-full sm:flex flex-col gap-4 mt-8 overflow-auto ">
                  <div className="flex sm:flex-row flex-col gap-5 overflow-auto">
                    {forecastData && <RenderForecast {...forecastData} />}
                  </div>
                  <div className="sm:block hidden text-center text-lg font-roboto  font-semibold mt-2 ">
                    <div className="flex  items-center justify-center ">
                      <p className="text-center">Swipe left for more</p>
                      <MdOutlineSwipe className="size-7 ml-3 animated-bg rounded-2xl  " />
                    </div>
                  </div>
                </div>
                {/* current data */}
                <div className="sm:hidden block animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl mt-20">
                  Current data
                </div>
                <div className="sm:w-1/3 w-full border-4 sm:rounded-none border-slate-700 sm:border-y-0 p-8">
                  <CurrentData weatherData={weatherData} />
                </div>
                {/* visual forecast */}
                <div className="sm:hidden block animated-bg opacity-70 text-center bg-gradient-to-r from-teal-500 to-slate-500 rounded-full p-3 text-black text-lg outline-none font-bold hover:shadow-xl mt-10">
                  Visual Forecast
                </div>
                <div className="sm:w-1/3 w-full">
                  <div className="w-full mt-8">
                    <VisualData {...forecastData} />
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default App;
