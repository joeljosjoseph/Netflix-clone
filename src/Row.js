import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./row.css";

function Row({ title, fetchURL, largeRow }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function getData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    getData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {
          //posters
        }
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              src={`${base_url}${
                largeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row-poster ${largeRow && "row-posterLarge"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
