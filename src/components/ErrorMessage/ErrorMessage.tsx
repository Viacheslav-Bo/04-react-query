// Обробка форми має бути реалізована через Form Actions.
// Якщо під час натискання кнопки відправки форми текстове поле порожнє, покажіть користувачеві сповіщення про те, що необхідно ввести текст для пошуку зображень.
// Please enter your search query.
// Ця перевірка виконується в SearchBar в момент відправки форми. Для сповіщень використовуйте бібліотеку React Hot Toast.
// Якщо в результаті запиту масив фільмів порожній, виводьте повідомлення:
// No movies found for your request.
// Ця перевірка виконується в App при обробці HTTP-запиту. Для сповіщень використовуйте бібліотеку React Hot Toast.
// При кожному новому пошуку колекція фільмів з попереднього пошуку повинна очищатись.

// import { toast } from "react-hot-toast";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css.text}>There was an error, please try again...</p>;
}
