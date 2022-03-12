import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Banner({ fetchUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const { results } = request.data;
      setMovies(results[Math.floor(Math.random() * (results.length - 1))]);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //   console.log(movies);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseURL}${movies?.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__tittle">
          {movies?.name || movies?.title || movies?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <div className="banner__description">
          {truncate(movies?.overview, 150)}
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
