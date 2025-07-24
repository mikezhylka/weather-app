import { API_ENDPOINTS } from "@/endpoints";
import type { CitiesState } from "@/types/CitiesState";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { City } from "../../../types/City";
import type { Forecast } from "../../../types/Forecast";

export const updateCityWeatherThunk = createAsyncThunk<
  City,
  string,
  { rejectValue: string }
>("weather/updateCity", async (cityId, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as { cities: CitiesState };
    const city = state.cities.cities.find((c) => c.id === cityId);

    if (!city) {
      return thunkAPI.rejectWithValue("City not found in store");
    }

    const { lat, lon } = city;

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

    return {
      ...city,
      forecast,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error)
        ? error.message
        : "Failed to update weather for chosen city"
    );
  }
});
