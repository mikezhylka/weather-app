export interface WeatherList {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;

  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop?: number;
  sys?: {
    pod?: string;
  };
}
