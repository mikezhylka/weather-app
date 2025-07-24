import { City } from "./City";

export interface CitiesState {
  cities: City[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
