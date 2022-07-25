import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

//https://api.themoviedb.org/3/discover/movie?api_key=aaf71565e98f3cb61d69224b23c4b85d&with_genres=99
