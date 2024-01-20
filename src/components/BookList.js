import { useAppContext } from "../context/Context";
import styles from "./BookList.module.css";
import BookCard from "./BookCard";
import AppSpinner from "./Spinner";
function BookList() {
  const { books, loading } = useAppContext();
  return (
    <div>
      {loading ? (
        <AppSpinner />
      ) : (
        <div className={styles.bookCardsContainer}>
          {books &&
            books.map((curr_book) => (
              <BookCard book={curr_book} key={curr_book.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
