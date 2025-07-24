import * as thunks from "@/features/cities/thunks/updateCityWeatherThunk";
import { mockCity } from "@/mocks/mockCity";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CityCard } from "./CityCard";

const mockNavigate = vi.fn();
let dispatchMock: ReturnType<typeof vi.fn>;

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: () => mockNavigate,
}));

vi.mock("@/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("CityCard", () => {
  beforeEach(() => {
    dispatchMock = vi.fn(() => ({
      unwrap: vi.fn(() => Promise.resolve()),
    }));
    vi.clearAllMocks();
  });

  it("renders city name, country and temperature", () => {
    renderWithRouter(<CityCard city={mockCity} />);
    expect(screen.queryByText(/Kyiv/i)).not.toBeNull();
    expect(screen.queryByText(/Ukraine/i)).not.toBeNull();
    expect(screen.queryByText(/20°C/i)).not.toBeNull();
  });

  it("navigates to city details on card click", () => {
    renderWithRouter(<CityCard city={mockCity} />);
    fireEvent.click(screen.getByText(/Kyiv/i));
    expect(mockNavigate).toHaveBeenCalledWith("/1");
  });

  it("dispatches weather update on refresh button click and stops propagation", async () => {
    const thunkFunction = vi.fn();
    vi.spyOn(thunks, "updateCityWeatherThunk").mockReturnValue(thunkFunction);

    renderWithRouter(<CityCard city={mockCity} />);

    const refreshButton = screen.getByRole("button", {
      name: /refresh weather/i,
    });

    fireEvent.click(refreshButton);

    expect(dispatchMock).toHaveBeenCalledWith(thunkFunction);
    expect(thunks.updateCityWeatherThunk).toHaveBeenCalledWith("1");
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
