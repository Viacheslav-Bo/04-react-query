// Хедер з формою пошуку SearchBar
// компонент SearchBar приймає один пропс onSubmit – функцію для передачі
// значення інпуту під час сабміту форми.
// Компонент SearchBar має створювати DOM-елемент наступної структури:

import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

// const myKey = import.meta.env.VITE_API_KEY;
// console.log(myKey);

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query);
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
