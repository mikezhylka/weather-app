import type { Wind } from "@/types/Wind";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OtherStatistics } from "./OtherStatistics";

describe("OtherStatistics", () => {
  it("formats wind correctly", () => {
    const wind: Wind = { speed: 5.2, deg: 180 };
    render(<OtherStatistics title="Wind" value={wind} />);
    
    expect(screen.getByText("Wind")).toBeInTheDocument();
    expect(screen.getByText("5.2 m/s, 180°")).toBeInTheDocument();
  });

  it("formats pressure correctly", () => {
    render(<OtherStatistics title="Pressure" value={1013} />);
    
    expect(screen.getByText("Pressure")).toBeInTheDocument();
    expect(screen.getByText("1013 hPa")).toBeInTheDocument();
  });

  it("formats humidity correctly", () => {
    render(<OtherStatistics title="Humidity" value={65} />);
    
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("formats visibility correctly", () => {
    render(<OtherStatistics title="Visibility" value={10500} />);
    
    expect(screen.getByText("Visibility")).toBeInTheDocument();
    expect(screen.getByText("10.5 km")).toBeInTheDocument();
  });

  it("formats sunrise time correctly", () => {
    const timestamp = 1620000000; // 3 of May 2021, 09:00:00 UTC
    render(<OtherStatistics title="Sunrise" value={timestamp} />);
    
    expect(screen.getByText("Sunrise")).toBeInTheDocument();
    const expectedTime = new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  it("formats sunset time correctly", () => {
    const timestamp = 1620040000;
    render(<OtherStatistics title="Sunset" value={timestamp} />);
    
    expect(screen.getByText("Sunset")).toBeInTheDocument();
    const expectedTime = new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  it("handles default case correctly", () => {
    render(<OtherStatistics title="Custom" value="Test Value" />);
    
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("handles numeric values in default case", () => {
    render(<OtherStatistics title="Custom" value={123.45} />);
    
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText("123.45")).toBeInTheDocument();
  });

  it("handles zero visibility correctly", () => {
    render(<OtherStatistics title="Visibility" value={0} />);
    
    expect(screen.getByText("Visibility")).toBeInTheDocument();
    expect(screen.getByText("0 km")).toBeInTheDocument();
  });

  it("handles wind with gust correctly", () => {
    const wind: Wind = { speed: 5.2, deg: 180 };
    render(<OtherStatistics title="Wind" value={wind} />);
    
    expect(screen.getByText("5.2 m/s, 180°")).toBeInTheDocument();
  });

  it("handles timezone correctly for sunrise/sunset", () => {
    const timestamp = 1620000000;
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    };
    
    const expectedTime = new Date(timestamp * 1000).toLocaleTimeString([], options);
    
    const originalToLocaleTimeString = Date.prototype.toLocaleTimeString;
    Date.prototype.toLocaleTimeString = vi.fn(() => expectedTime);
    
    render(<OtherStatistics title="Sunrise" value={timestamp} />);
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
    Date.prototype.toLocaleTimeString = originalToLocaleTimeString;
  });
});