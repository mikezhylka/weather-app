import { City } from "@/types/City";

export const mockCity: City = {
  id: "1",
  name: "Kyiv",
  country: "Ukraine",
  lat: 50.45,
  lon: 30.52,
  sunrise: 1620000000,
  sunset: 1620040000,
  forecast: [],
  weather: {
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d",
    city: null!,
    cnt: 0,
    cod: "200",
    message: 0,
    list: [
      {
        dt: 1620000000,
        dt_txt: "2021-05-03 15:00:00",
        main: {
          temp: 20.4,
          feels_like: 22,
          temp_min: 18,
          temp_max: 23,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 1008,
          humidity: 65,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 3.5,
          deg: 180,
          gust: 5.0,
        },
        visibility: 10000,
      },
    ],
  },
};