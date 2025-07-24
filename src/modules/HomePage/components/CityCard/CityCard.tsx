import { Loader } from "@/components/Loader";
import { updateCityWeatherThunk } from "@/features/cities/thunks/updateCityWeatherThunk";
import { useAppDispatch } from "@/store/hooks";
import type { City } from "@/types/City";
import cn from "classnames";
import { MouseEvent, useState, type FC } from "react";
import { useNavigate } from "react-router";
import styles from "./CityCard.module.scss";

interface Props {
  city: City;
}

export const CityCard: FC<Props> = ({ city }) => {
  const { name, country, weather } = city;
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const weatherConditions = weather.list[0].weather[0].main.toLowerCase();
  const currentTemperature = Math.round(weather.list[0].main.temp);

  const handleRefresh = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      setIsUpdating(true);
      await dispatch(updateCityWeatherThunk(city.id)).unwrap();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/${city.id}`);
  };

  return (
    <div
      className={cn(styles["city-card"], {
        [styles[`city-card--${weatherConditions}`]]: weatherConditions,
        [styles["city-card--loading"]]: isUpdating,
      })}
      onClick={handleCardClick}
    >
      {isUpdating ? (
        <Loader />
      ) : (
        <>
          <div className={styles["city-card__header"]}>
            <h2 className={styles["city-card__name"]}>{name}</h2>
            <p className={styles["city-card__temperature"]}>
              {currentTemperature}°C
            </p>
          </div>
          <div className={styles["city-card__footer"]}>
            <p className={styles["city-card__country"]}>{country}</p>
            <div className={styles["city-card__footer-wrap"]}>
              <p className={styles["city-card__condition"]}>
                {weatherConditions}
              </p>
              <button
                aria-label="Refresh weather"
                className={cn(styles["city-card__refresh"], {
                  [styles["city-card__refresh--black"]]:
                    weatherConditions === "sunny",
                })}
                onClick={handleRefresh}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
