import axios from "./axios";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./row.css";
import movieTrailer from "movie-trailer";

function Row({ title, fetchURL, largeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    wdith: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          console.log("url is " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                largeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row-poster ${largeRow && "row-posterLarge"}`}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoID={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
