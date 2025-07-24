import { useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { useNavigate, useParams } from "react-router";
import styles from "./CityWeatherPage.module.scss";
import { CityForecast } from "./components/CityForecast";
import { OtherStatistics } from "./components/OtherStatistics";

export const CityWeatherPage = () => {
  const navigate = useNavigate();
  const { cityId } = useParams();
  const { cities } = useAppSelector((state) => state.cities);
  const currentCity = cities.find((city) => city.id === cityId);

  if (!cityId || !cities.length || !currentCity) {
    return <div className={styles["city-weather-page"]}>City not found</div>;
  }

  const { name, weather } = currentCity || {};
  const { city } = weather;
  const { sunset, sunrise } = city;
  const { feels_like, temp, temp_max, temp_min } = weather!.list[0].main;

  const handleBackClick = () => {
    navigate("/");
  };

  const normalizeTemperature = (temperature: number) => {
    return temperature.toFixed(0);
  };

  const weatherConditions = weather!.list[0].weather[0].main;
  const wind = weather!.list[0].wind;

  const currentForecast = weather!.list[0];

  const { visibility, main } = currentForecast;
  const { pressure, humidity } = main;

  return (
    <section className={styles["city-weather-page"]}>
      <button
        className={styles["city-weather-page__back-button"]}
        onClick={handleBackClick}
      >
      </button>
      <div className={styles["city-weather-page__header"]}>
        <h2 className={styles["city-weather-page__city"]}>{name}</h2>
        <p className={styles["city-weather-page__conditions"]}>
          {weatherConditions}
        </p>
        <h1
          className={styles["city-weather-page__temp"]}
        >{`${normalizeTemperature(temp)}°`}</h1>
        <h3
          className={styles["city-weather-page__feels-like"]}
        >{`Feels Like: ${normalizeTemperature(feels_like)}°`}</h3>
        <div className={styles["city-weather-page__min-max"]}>
          <p
            className={styles["city-weather-page__max-temp"]}
          >{`H: ${normalizeTemperature(temp_max)}°`}</p>
          <p
            className={styles["city-weather-page__min-temp"]}
          >{`L: ${normalizeTemperature(temp_min)}°`}</p>
        </div>
      </div>

      <CityForecast currentCity={currentCity} />

      <div
        className={cn(
          styles["city-weather-page__statistics"],
          styles["statistics"]
        )}
      >
        <OtherStatistics title="Wind" value={wind} />
        <OtherStatistics title="Pressure" value={pressure} />
        <OtherStatistics title="Humidity" value={humidity} />
        <OtherStatistics title="Visibility" value={visibility} />
        <OtherStatistics title="Sunrise" value={sunrise} />
        <OtherStatistics title="Sunset" value={sunset} />
      </div>
    </section>
  );
};
