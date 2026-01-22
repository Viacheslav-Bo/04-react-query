import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    // в ключ передаємо те, шо опрацьовується в ф-ї(query і тд) . типу як залежності
    queryKey: ["movies", query, currentPage],
    // треба передати постлання на ф-ю fetchMovies, але оскільки вона приймає шось то передаємо так як нижче
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (newQuery: string) => {
    const trimedNewQuery = newQuery.trim();
    if (!trimedNewQuery) {
      toast.error("Please enter a search query");
      return;
    }
    // коли запит новий — скидаємо
    setSelectedMovie(null);
    setCurrentPage(1);
    setQuery(trimedNewQuery);
  };

  useEffect(() => {
    if (!query) return;

    if (!isLoading && !isError && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
    // залежності
  }, [data, isLoading, isError, query]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {data && data?.total_pages > 1 && (
        <ReactPaginate
          pageCount={data?.total_pages ?? 0}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          // selected + 1, бо в лібі починається з 0. просто шоб синхронізувати
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          // те саме і для -1
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}
