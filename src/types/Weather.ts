import type { City } from "./City";
import type { WeatherList } from "./WeatherList";

export interface Weather {
  city: City;
  cnt: number;
  cod: string;
  message: number;
  list: WeatherList[];
  id: number;
  main: string;
  description: string;
  icon: string;
}
