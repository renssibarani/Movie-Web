import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWI4NDEwMGRiMDQ0ZjYxNGFmMGZlZDZlZTg5ZWI5NSIsInN1YiI6IjY0NGI1MjQzNTFhNjRlMDkyMmRkMWQ4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1l37cs6saTuprI3wLNlQfvshnNEg5Z9WeMQOLxRwZPY";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchMovies(API_URL);
  }, []);

  const fetchMovies = (url) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        if (searchTerm) {
          setSearchResults(response.data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${searchTerm}&page=1`;

    axios
      .get(searchUrl, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setSearchResults(response.data.results);
        setMovies([]);
        // window.location.reload();
        // console.log(setSearchResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchMoreMovies = () => {
    const nextPage = movies.length / 20 + 1; // Ganti 20 dengan jumlah film per halaman yang diberikan oleh API
    const nextUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${nextPage}`;
    fetchMovies(nextUrl);
  };

  return (
    <div>
      <h1>Movie Website</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="movies">
          {searchResults.length > 0
            ? searchResults.map((movie) => (
                <div key={movie.id} className="movie">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              ))
            : movies.map((movie) => (
                <div key={movie.id} className="movie">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
