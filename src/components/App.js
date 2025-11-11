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
      setError("Something went wrong. Please try again later.");
      setMovies([]);
    }
  };

  return (
    <div className="container">
      <h1>Search Movie</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <li>

          <ul> 
          <div key={movie.imdbID} className="movie-card">
            <h3>{movie.Title} ({movie.Year})</h3>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}
              alt={movie.Title}
            />
          </div>
          </ul>
           </li>
        ))}
      </div>
    </div>
  );
};

export default App;
