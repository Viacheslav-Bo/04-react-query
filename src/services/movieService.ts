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

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<fetchMoviesResponse> => {
  const url = "https://api.themoviedb.org/3/search/movie";
  const response = await axios.get<fetchMoviesResponse>(url, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};
