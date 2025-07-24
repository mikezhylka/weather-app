import { Forecast } from "@/types/Forecast";
import { Weather } from "@/types/Weather";

const createMockWeather = (main: string, id: number): Weather => ({
  id,
  main,
  description: `${main.toLowerCase()} sky`,
  icon: "01d",
  city: null!,
  cnt: 0,
  cod: "200",
  message: 0,
  list: [],
});


export const mockForecast: Forecast[] = [
  {
    dt: 1620000000,
    dt_txt: "2021-05-03 09:00:00",
    main: {
      temp: 20.4,
      feels_like: 22,
      temp_min: 18,
      temp_max: 23,
      pressure: 1012,
      humidity: 65,
    },
    weather: [createMockWeather("Clear", 800)],
  },
  {
    dt: 1620010800,
    dt_txt: "2021-05-03 12:00:00",
    main: {
      temp: 22.7,
      feels_like: 24,
      temp_min: 21,
      temp_max: 25,
      pressure: 1010,
      humidity: 60,
    },
    weather: [createMockWeather("Clouds", 801)],
  },
];