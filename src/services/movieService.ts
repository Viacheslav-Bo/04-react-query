// Функцію fetchMovies для виконання HTTP-запитів винесіть в окремий файл
// src/services/movieService.ts.
// Типізуйте її параметри, результат, який вона повертає, та відповідь від Axios.

import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_API_KEY;

interface fetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  const results = await axios.get<fetchMoviesResponse>(url, options);

  return results.data;
};
