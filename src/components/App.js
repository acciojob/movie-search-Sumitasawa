import React, { useState } from "react";
import "regenerator-runtime/runtime";

const API_URL = "https://www.omdbapi.com/?apikey=99eb9fd1";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setMovies([]);
    }
  };

  return (
    <div className="container">
      <h1>Search Movie</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* ✅ Movies List in UL */}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-card">
            <h3>
              {movie.Title} ({movie.Year})
            </h3>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.Title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
