import { City } from "@/types/City";
import { Forecast } from "@/types/Forecast";
import { FC } from "react";
import styles from "./CityForecast.module.scss";

interface Props {
  currentCity: City;
}

export const CityForecast: FC<Props> = ({ currentCity }) => {
  const { forecast } = currentCity;

  const normalizeHour = (day: Forecast) => {
    return new Date(day.dt_txt).getHours().toString().padStart(2, "0");
  };

  return (
    <div className={styles["city-forecast"]}>
      <section className={styles["city-forecast-list"]}>
        {forecast.map((day) => (
          <div
            key={day.dt}
            className={styles["forecast-day"]}
            data-testid="forecast-item"
          >
            <h4
              className={styles["forecast-day__hour"]}
              data-testid="forecast-hour"
            >
              {normalizeHour(day)}
            </h4>
            <p
              className={styles["forecast-day__temperature"]}
              data-testid="forecast-temp"
            >
              {Math.round(day.main.temp)}°
            </p>
            <p
              className={styles["forecast-day__conditions"]}
              data-testid="forecast-conditions"
            >
              {day.weather[0].main}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
