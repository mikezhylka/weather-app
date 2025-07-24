import type { Wind } from "@/types/Wind";
import { FC } from "react";
import styles from "./OtherStatistics.module.scss";

interface Props {
  title: string;
  value: number | Wind | string;
}

export const OtherStatistics: FC<Props> = ({ title, value }) => {
  const formatValue = (): string => {
    switch (title) {
      case "Wind": {
        const { speed, deg } = value as Wind;

        return `${speed} m/s, ${deg}°`;
      }
      case "Pressure":
        return `${value} hPa`;
      case "Humidity":
        return `${value}%`;
      case "Visibility":
        return `${(value as number) / 1000} km`;
      case "Sunset":
      case "Sunrise":
        return new Date((value as number) * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      default:
        return value.toString();
    }
  };

  return (
    <div className={styles["statistics"]}>
      <h4 className={styles["statistics__title"]}>{title}</h4>
      <p className={styles["statistics__value"]}>{formatValue()}</p>
    </div>
  );
};
