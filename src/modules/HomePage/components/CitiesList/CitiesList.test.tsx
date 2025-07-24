/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeCity } from "@/features/cities/citiesSlice";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { CitiesList } from "./CitiesList";

vi.mock("../CityCard", () => ({
  CityCard: ({ city }: { city: any }) => (
    <div data-testid="city-card">{city.name}</div>
  ),
}));

const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      cities: () => initialState,
    },
  });
};

describe("CitiesList", () => {
  const mockSetIsEditing = vi.fn();

  const mockCities = [
    { id: "1", name: "Kyiv", country: "Ukraine", lat: 50.45, lon: 30.52 },
    { id: "2", name: "London", country: "UK", lat: 51.51, lon: -0.13 },
  ];

  it("displays empty message when no cities", () => {
    const store = createMockStore({ cities: [] });
    
    render(
      <Provider store={store}>
        <CitiesList isEditing={false} setIsEditing={mockSetIsEditing} />
      </Provider>
    );

    expect(screen.getByText("No cities added yet.")).toBeInTheDocument();
  });

  it("displays list of cities", () => {
    const store = createMockStore({ cities: mockCities });
    
    render(
      <Provider store={store}>
        <CitiesList isEditing={false} setIsEditing={mockSetIsEditing} />
      </Provider>
    );

    const cityCards = screen.getAllByTestId("city-card");
    expect(cityCards).toHaveLength(2);
    expect(cityCards[0]).toHaveTextContent("Kyiv");
    expect(cityCards[1]).toHaveTextContent("London");
  });

  it("shows delete buttons in edit mode", () => {
    const store = createMockStore({ cities: mockCities });
    
    render(
      <Provider store={store}>
        <CitiesList isEditing={true} setIsEditing={mockSetIsEditing} />
      </Provider>
    );

    const deleteButtons = screen.getAllByRole("button");
    expect(deleteButtons).toHaveLength(2);
  });

  it("dispatches removeCity action when delete button clicked", () => {
    const store = createMockStore({ cities: mockCities });
    store.dispatch = vi.fn();
    
    render(
      <Provider store={store}>
        <CitiesList isEditing={true} setIsEditing={mockSetIsEditing} />
      </Provider>
    );

    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalledWith(removeCity("1"));
  });

  it("turns off edit mode when last city is deleted", () => {
    const singleCity = [mockCities[0]];
    const store = createMockStore({ cities: singleCity });
    store.dispatch = vi.fn();
    
    render(
      <Provider store={store}>
        <CitiesList isEditing={true} setIsEditing={mockSetIsEditing} />
      </Provider>
    );

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    expect(store.dispatch).toHaveBeenCalledWith(removeCity("1"));
  });
});