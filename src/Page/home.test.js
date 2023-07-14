import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import App from "./HomePage";

jest.mock("axios");

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and button", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search movie");
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("fetches movies when the component mounts", async () => {
    const mockMovies = {
      data: {
        results: [
          {
            id: 1,
            title: "Movie 1",
            poster_path: "/path/to/poster1.jpg",
            overview: "Overview 1",
            vote_average: 7.5,
          },
          {
            id: 2,
            title: "Movie 2",
            poster_path: "/path/to/poster2.jpg",
            overview: "Overview 2",
            vote_average: 8.0,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMovies);

    render(<App />);

    await waitFor(() => {
      const movieElements = screen.getAllByTestId("movie");

      expect(movieElements.length).toBe(2);
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWI4NDEwMGRiMDQ0ZjYxNGFmMGZlZDZlZTg5ZWI5NSIsInN1YiI6IjY0NGI1MjQzNTFhNjRlMDkyMmRkMWQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1l37cs6saTuprI3wLNlQfvshnNEg5Z9WeMQOLxRwZPY",
          },
        }
      );
    });
  });

  test("displays movie details when a movie is clicked", async () => {
    const mockMovies = {
      data: {
        results: [
          {
            id: 1,
            title: "Movie 1",
            poster_path: "/path/to/poster1.jpg",
            overview: "Overview 1",
            vote_average: 7.5,
          },
          {
            id: 2,
            title: "Movie 2",
            poster_path: "/path/to/poster2.jpg",
            overview: "Overview 2",
            vote_average: 8.0,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMovies);

    render(<App />);

    await waitFor(() => {
      const movieElement = screen.getAllByTestId("movie")[0];

      fireEvent.click(movieElement);
    });

    const movieDetailElement = screen.getByTestId("movie-detail");

    expect(movieDetailElement).toBeInTheDocument();
  });

  test("displays movie title when a movie is clicked", async () => {
    const mockMovies = {
      data: {
        results: [
          {
            id: 1,
            title: "Movie 1",
            poster_path: "/path/to/poster1.jpg",
            overview: "Overview 1",
            vote_average: 7.5,
          },
          {
            id: 2,
            title: "Movie 2",
            poster_path: "/path/to/poster2.jpg",
            overview: "Overview 2",
            vote_average: 8.0,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockMovies);

    render(<App />);

    await waitFor(() => {
      const movieElement = screen.getAllByTestId("movie")[0];

      fireEvent.click(movieElement);
    });

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Rating: 7.5")).toBeInTheDocument();
    expect(screen.getByText("Overview 1")).toBeInTheDocument();
  });

  test("displays search results when a search is performed", async () => {
    const mockSearchResults = {
      data: {
        results: [
          {
            id: 1,
            title: "Movie 1",
            poster_path: "/path/to/poster1.jpg",
            overview: "Overview 1",
            vote_average: 7.5,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockSearchResults);

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search movie");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "Movie 1" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const movieElements = screen.getAllByTestId("movie");

      expect(movieElements.length).toBe(1);
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
    });
  });
});
