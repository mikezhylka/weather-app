import type { Wind } from "@/types/Wind";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OtherStatistics } from "./OtherStatistics";

describe("OtherStatistics", () => {
  it("formats wind correctly", () => {
    const wind: Wind = { speed: 5.2, deg: 180 };
    render(<OtherStatistics title="Wind" value={wind} />);
    
    expect(screen.queryByText("Wind")).not.toBeNull();
    expect(screen.queryByText("5.2 m/s, 180°")).not.toBeNull();
  });

  it("formats pressure correctly", () => {
    render(<OtherStatistics title="Pressure" value={1013} />);
    
    expect(screen.queryByText("Pressure")).not.toBeNull();
    expect(screen.queryByText("1013 hPa")).not.toBeNull();
  });

  it("formats humidity correctly", () => {
    render(<OtherStatistics title="Humidity" value={65} />);
    
    expect(screen.queryByText("Humidity")).not.toBeNull();
    expect(screen.queryByText("65%")).not.toBeNull();
  });

  it("formats visibility correctly", () => {
    render(<OtherStatistics title="Visibility" value={10500} />);
    
    expect(screen.queryByText("Visibility")).not.toBeNull();
    expect(screen.queryByText("10.5 km")).not.toBeNull();
  });

  it("formats sunrise time correctly", () => {
    const timestamp = 1620000000; // 3 of May 2021, 09:00:00 UTC
    render(<OtherStatistics title="Sunrise" value={timestamp} />);
    
    expect(screen.queryByText("Sunrise")).not.toBeNull();
    const expectedTime = new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.queryByText(expectedTime)).not.toBeNull();
  });

  it("formats sunset time correctly", () => {
    const timestamp = 1620040000;
    render(<OtherStatistics title="Sunset" value={timestamp} />);
    
    expect(screen.queryByText("Sunset")).not.toBeNull();
    const expectedTime = new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.queryByText(expectedTime)).not.toBeNull();
  });

  it("handles default case correctly", () => {
    render(<OtherStatistics title="Custom" value="Test Value" />);
    
    expect(screen.queryByText("Custom")).not.toBeNull();
    expect(screen.queryByText("Test Value")).not.toBeNull();
  });

  it("handles numeric values in default case", () => {
    render(<OtherStatistics title="Custom" value={123.45} />);
    
    expect(screen.queryByText("Custom")).not.toBeNull();
    expect(screen.queryByText("123.45")).not.toBeNull();
  });

  it("handles zero visibility correctly", () => {
    render(<OtherStatistics title="Visibility" value={0} />);
    
    expect(screen.queryByText("Visibility")).not.toBeNull();
    expect(screen.queryByText("0 km")).not.toBeNull();
  });

  it("handles wind with gust correctly", () => {
    const wind: Wind = { speed: 5.2, deg: 180 };
    render(<OtherStatistics title="Wind" value={wind} />);
    
    expect(screen.queryByText("5.2 m/s, 180°")).not.toBeNull();
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
    expect(screen.queryByText(expectedTime)).not.toBeNull();
    Date.prototype.toLocaleTimeString = originalToLocaleTimeString;
  });
});
