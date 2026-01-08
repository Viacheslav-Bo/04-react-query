// Функцію fetchMovies для виконання HTTP-запитів винесіть в окремий файл
// src/services/movieService.ts.
// Типізуйте її параметри, результат, який вона повертає, та відповідь від Axios.

import axios from "axios";

export default async function fetchMovies(query: string) {
  const API;
  const URL;
  const response = await axios.get(API);
  return response.data.results;
}
