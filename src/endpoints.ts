const BASE_URL = 'https://api.openweathermap.org/';
const API_KEY = import.meta.env.VITE_API_KEY;

export const API_ENDPOINTS = {
  geolocation: (cityName: string) =>
    `${BASE_URL}geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`,

  forecast: (lat: number, lon: number) =>
    `${BASE_URL}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
};
