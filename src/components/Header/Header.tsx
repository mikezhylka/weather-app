import type { FC } from "react";
import { useNavigate } from "react-router";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className={styles["header"]}>
      <h1 className={styles["header__logo"]} onClick={handleLogoClick}>
        atmosphere
      </h1>
    </header>
  );
};
