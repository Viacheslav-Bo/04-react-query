import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [onSelect, setOnSelect] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    console.log(query);
    // перевірка на введення
    if (!query) {
      toast.error("Please enter a search query");
      return;
    }

    // пробуємо виконати запити через трай кеч
    try {
      // setMovies([])
      // тут одразу після запиту даємо лоадер
      setIsLoading(true);
      // скидаємо помилку
      setIsError(false);
      setMovies([]);
      setOnSelect(null);
      // тут передаєм відповідь аксіоса
      const newMovies = await fetchMovies(query);

      // перевірка на довжину
      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
        return;
      }
      // записуємо фільми в стейт. нові фільми - це результати відповіді
      setMovies(newMovies);
    } catch {
      // показуємо помилки якшо є
      setIsError(true);
      toast.error("Something went wrong. Try again.");
    } finally {
      // виключаємо лоадер, після того як запит обробився
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <Loader />}

      {isError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={(movie) => setOnSelect(movie)} />
        )
      )}
      {onSelect && (
        <MovieModal movie={onSelect} onClose={() => setOnSelect(null)} />
      )}
    </>
  );
}
