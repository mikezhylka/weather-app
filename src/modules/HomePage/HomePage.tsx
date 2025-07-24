import { addCityThunk } from "@/features/cities/thunks/addCityThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import styles from "./HomePage.module.scss";
import { CitiesList } from "./components/CitiesList";

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addCityThunk(searchValue));
    setSearchValue("");
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className={styles["home"]}>
      <form
        className={styles["home__search"]}
        onSubmit={handleSubmit}
        name="search"
      >
        <div className={styles["home__search-input-wrap"]}>
          <img
            src="/icons/search.svg"
            className={styles["home__search-icon"]}
          />
          <input
            className={styles["home__search-input"]}
            type="text"
            value={searchValue}
            placeholder="Search for a city"
            onChange={handleSearchChange}
          />
        </div>
      </form>
      {cities.length > 0 && (
        <button
          className={styles["home__edit-button"]}
          onClick={handleEditClick}
        >
          {isEditing ? "Cancel Editing" : "Edit"}
        </button>
      )}
      <CitiesList isEditing={isEditing} setIsEditing={setIsEditing} />
    </section>
  );
};
