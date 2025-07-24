import { mockCity } from "@/mocks/mockCity";
import { mockForecast } from "@/mocks/mockForecast";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CityForecast } from "./CityForecast";


const modifiedMockCity = { ...mockCity, forecast: mockForecast }

describe("CityForecast", () => {
  it("renders forecast items correctly", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    const forecastItems = screen.getAllByTestId("forecast-item");
    expect(forecastItems).toHaveLength(2);
  });

  it("formats hour correctly with leading zero", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    expect(screen.getAllByTestId("forecast-hour")[0].textContent).toBe("09");
    expect(screen.getAllByTestId("forecast-hour")[1].textContent).toBe("12");
  });

  it("displays rounded temperature with degree symbol", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    expect(screen.getAllByTestId("forecast-temp")[0].textContent).toBe("20°");
    expect(screen.getAllByTestId("forecast-temp")[1].textContent).toBe("23°");
  });

  it("shows weather conditions", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    expect(screen.getAllByTestId("forecast-conditions")[0].textContent).toBe("Clear");
    expect(screen.getAllByTestId("forecast-conditions")[1].textContent).toBe("Clouds");
  });

  it("handles empty forecast gracefully", () => {
    const emptyCity = { ...modifiedMockCity, forecast: [] };
    render(<CityForecast currentCity={emptyCity} />);
    
    const forecastItems = screen.queryAllByTestId("forecast-item");
    expect(forecastItems).toHaveLength(0);
  });
});