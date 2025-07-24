import type { Forecast } from "./Forecast";
import type { Weather } from "./Weather";

export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  sunrise: number;
  sunset: number;
  forecast: Forecast[];
  weather: Weather;
}
