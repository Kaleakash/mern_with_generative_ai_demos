// src/tests/SearchBar.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar Component - Filtering & Sorting", () => {
  test("filters books by genre", () => {
    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const genreDropdown = screen.getByTestId("genre-filter");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "Harry" } });
    fireEvent.change(genreDropdown, { target: { value: "Fantasy" } });
    fireEvent.click(button);

    expect(screen.getByTestId("search-results")).toHaveTextContent("Harry Potter");
    expect(screen.getByTestId("search-results")).not.toHaveTextContent("The Great Gatsby");
  });

  test("sorts books by title", () => {
    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const sortDropdown = screen.getByTestId("sort-dropdown");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "The" } });
    fireEvent.change(sortDropdown, { target: { value: "title" } });
    fireEvent.click(button);

    const results = screen.getByTestId("search-results");
    const listItems = results.querySelectorAll("li");

    expect(listItems[0]).toHaveTextContent("The Great Gatsby");
    expect(listItems[1]).toHaveTextContent("The Hobbit");
  });

  test("sorts books by publication year", () => {
    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const sortDropdown = screen.getByTestId("sort-dropdown");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "The" } });
    fireEvent.change(sortDropdown, { target: { value: "year" } });
    fireEvent.click(button);

    const results = screen.getByTestId("search-results");
    const listItems = results.querySelectorAll("li");

    expect(listItems[0]).toHaveTextContent("The Great Gatsby (1925)");
    expect(listItems[1]).toHaveTextContent("The Hobbit (1937)");
  });

  test("shows 'No results found' for unmatched search", () => {
    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "Nonexistent Book" } });
    fireEvent.click(button);

    expect(screen.getByTestId("search-results")).toHaveTextContent("No results found");
  });
});

describe("Search Performance Under Network Conditions", () => {
  test("measures response time under normal conditions", async () => {
    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "Harry Potter" } });

    const startTime = performance.now();
    fireEvent.click(button);
    await waitFor(() => screen.getByText("Harry Potter (1997)"));
    const endTime = performance.now();

    const responseTime = endTime - startTime;
    console.log("Normal Network Response Time:", responseTime, "ms");

    expect(responseTime).toBeLessThan(500);
  });

  test("simulates slow network response", async () => {
    jest.useFakeTimers();

    render(<SearchBar />);

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "Harry Potter" } });

    const startTime = performance.now();
    fireEvent.click(button);

    jest.advanceTimersByTime(2000); // Simulate 2s delay
    await waitFor(() => screen.getByText("Harry Potter (1997)"));
    const endTime = performance.now();

    const responseTime = endTime - startTime;
    console.log("Slow Network Response Time:", responseTime, "ms");

    expect(responseTime).toBeGreaterThanOrEqual(2000);
    jest.useRealTimers();
  });
});
