import { removeCity } from "@/features/cities/citiesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Dispatch, FC, SetStateAction } from "react";
import { CityCard } from "../CityCard";
import styles from "./CitiesList.module.scss";

interface Props {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const CitiesList: FC<Props> = ({ isEditing, setIsEditing }) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  if (cities.length === 0) {
    return <p className={styles["cities-list__empty"]}>No cities added yet.</p>;
  }

  const handleCityDeletion = (cityId: string) => () => {
    if (cities.length === 1) {
      setIsEditing(false);
    }

    dispatch(removeCity(cityId));
  };

  return (
    <div className={styles["cities-list"]}>
      <ul className={styles["cities-list__list"]}>
        {cities.map((city) => (
          <li className={styles["cities-list__item"]} key={city.id}>
            {isEditing ? (
              <button
                className={styles["cities-list__delete-city-button"]}
                onClick={handleCityDeletion(city.id)}
              />
            ) : null}
            <CityCard city={city} />
          </li>
        ))}
      </ul>
    </div>
  );
};
