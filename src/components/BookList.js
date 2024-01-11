import { useAppContext } from "../context/Context";
import styles from "./BookList.module.css";
import BookCard from "./BookCard";
function BookList() {
  const { books } = useAppContext();
  return (
    <div className={styles.bookCardsContainer}>
      {books.map((curr_book) => (
        <BookCard book={curr_book} key={curr_book.id} />
      ))}
    </div>
  );
}

export default BookList;
