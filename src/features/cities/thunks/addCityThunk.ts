import { API_ENDPOINTS } from "@/endpoints";
import type { City } from "@/types/City";
import type { Forecast } from "@/types/Forecast";
import type { GeoResponse } from "@/types/GeoResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCityThunk = createAsyncThunk<
  City,
  string,
  { rejectValue: string }
>("weather/addCity", async (cityName: string, thunkAPI) => {
  try {
    const { data: geolocation } = await axios.get<GeoResponse[]>(
      API_ENDPOINTS.geolocation(cityName)
    );

    if (!geolocation.length) {
      return thunkAPI.rejectWithValue("City not found");
    }

    const { lat, lon, name, country } = geolocation[0];

    const { data: weather } = await axios.get(API_ENDPOINTS.forecast(lat, lon));

    const forecast: Forecast[] = weather.list.map((entry: Forecast) => ({
      dt: entry.dt,
      dt_txt: entry.dt_txt,
      main: {
        temp: entry.main.temp,
        feels_like: entry.main.feels_like,
        temp_min: entry.main.temp_min,
        temp_max: entry.main.temp_max,
        humidity: entry.main.humidity,
        pressure: entry.main.pressure,
      },
      weather: entry.weather.map((w) => ({
        main: w.main,
        description: w.description,
        icon: w.icon,
      })),
    }));

    // Get sunrise and sunset if available
    const sunrise = weather.city?.sunrise ?? 0;
    const sunset = weather.city?.sunset ?? 0;

    return {
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-${country}`,
      name,
      country,
      lat,
      lon,
      forecast,
      weather,
      sunrise,
      sunset,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.message : "Failed to fetch city data"
    );
  }
});
