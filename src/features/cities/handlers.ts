import type { City } from "@/types/City";

export const saveCitiesToLocalStorage = (cities: City[]) => {
  localStorage.setItem("cities", JSON.stringify(cities));
}