import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetail from "./MovieDetail";
describe("MovieDetail component", () => {
  test("renders movie details correctly", () => {
    const movie = {
      title: "Movie Title",
      vote_average: 7.5,
      overview: "This is a movie description",
      poster_path: "/path/to/poster.jpg",
    };

    render(<MovieDetail movie={movie} />);
    const titleElement = screen.getByText("Movie Title");
    const ratingElement = screen.getByText("Rating: 7.5");
    const overviewElement = screen.getByText("This is a movie description");
    const imageElement = screen.getByAltText("Movie Title");

    expect(titleElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(overviewElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  // Tambahkan unit test lainnya sesuai kebutuhan
});
