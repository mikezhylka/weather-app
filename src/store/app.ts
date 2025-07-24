import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import citiesReducer from "../features/cities/citiesSlice";

export const appStore = configureStore({
  reducer: {
    cities: citiesReducer,
  }
});


export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
