import css from "./Loader.module.css";

// Компонент Loader має відображатись замість галереї поки відбувається
// запит за фільмами та створювати DOM-елемент наступної структури:
{
  /* <p className={css.text}>Loading movies, please wait...</p>; */
}

export default function Loader() {
  return <p className={css.text}>Loading movies, please wait...</p>;
}
