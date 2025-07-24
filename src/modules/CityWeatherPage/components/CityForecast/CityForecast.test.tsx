import { mockCity } from "@/mocks/mockCity";
import { mockForecast } from "@/mocks/mockForecast";
import "@testing-library/jest-dom";
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
    
    expect(screen.getAllByTestId("forecast-hour")[0]).toHaveTextContent("09");
    expect(screen.getAllByTestId("forecast-hour")[1]).toHaveTextContent("12");
  });

  it("displays rounded temperature with degree symbol", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    expect(screen.getAllByTestId("forecast-temp")[0]).toHaveTextContent("20°");
    expect(screen.getAllByTestId("forecast-temp")[1]).toHaveTextContent("23°");
  });

  it("shows weather conditions", () => {
    render(<CityForecast currentCity={modifiedMockCity} />);
    
    expect(screen.getAllByTestId("forecast-conditions")[0]).toHaveTextContent("Clear");
    expect(screen.getAllByTestId("forecast-conditions")[1]).toHaveTextContent("Clouds");
  });

  it("handles empty forecast gracefully", () => {
    const emptyCity = { ...modifiedMockCity, forecast: [] };
    render(<CityForecast currentCity={emptyCity} />);
    
    const forecastItems = screen.queryAllByTestId("forecast-item");
    expect(forecastItems).toHaveLength(0);
  });
});