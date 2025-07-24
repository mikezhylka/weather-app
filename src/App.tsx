import { useEffect, type FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Header } from "./components/Header";
import { updateCityWeatherThunk } from "./features/cities/thunks/updateCityWeatherThunk";
import { CityWeatherPage } from "./modules/CityWeatherPage";
import { HomePage } from "./modules/HomePage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import "./styles/index.scss";
import type { City } from "./types/City";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  // update weather for all cities on initial load
  useEffect(() => {
    if (cities.length > 0) {
      cities.forEach((city: City) => {
        dispatch(updateCityWeatherThunk(city.id)).unwrap();
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:cityId" element={<CityWeatherPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
