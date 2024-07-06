import { images } from "./assest";
export const getWeatherIcon = (weather) => {
  switch (weather) {
    case "Clouds":
      return `${images.cloudday}`;
    case "Clear":
      return `${images.clear}`;
    case "Rain":
      return `${images.rain}`;
    case "Sunny":
      return `${images.sun}`;
    case "Drizzle":
      return `${images.drizzle}`;
    case "Snow":
      return `${images.snow}`;
    case "Mist":
      return `${images.haze}`;
    case "Haze":
      return `${images.haze}`;
    default:
      return `${images.stat}`;
  }
};
