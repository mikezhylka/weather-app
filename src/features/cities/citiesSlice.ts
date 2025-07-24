import type { CitiesState } from "@/types/CitiesState";
import type { City } from "@/types/City";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { saveCitiesToLocalStorage } from "./handlers";
import { addCityThunk } from "./thunks/addCityThunk";
import { updateCityWeatherThunk } from "./thunks/updateCityWeatherThunk";

export const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities")!)
      : [],
    status: "idle",
    error: null,
  } as CitiesState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city: City) => city.id !== action.payload
      );

      saveCitiesToLocalStorage(state.cities);
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCityThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCityThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!state.cities.some((city: City) => city.id === action.payload.id)) {
          state.cities.push(action.payload);
          saveCitiesToLocalStorage(state.cities);
        }
      })
      .addCase(addCityThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(updateCityWeatherThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCityWeatherThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCity = action.payload;
        const index = state.cities.findIndex((c) => c.id === updatedCity.id);
        if (index !== -1) {
          state.cities[index] = updatedCity;
          saveCitiesToLocalStorage(state.cities);
        }
      })
      .addCase(updateCityWeatherThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Update failed";
      });
  },
});
export const { removeCity, resetStatus } = citiesSlice.actions;
export default citiesSlice.reducer;
