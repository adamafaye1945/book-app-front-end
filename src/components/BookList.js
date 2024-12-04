import { useAppContext } from "../context/Context";
import styles from "./BookList.module.css";
import BookCard from "./BookCard";
import AppSpinner from "./Spinner";
import { useQuery } from "@apollo/client";
import {GOOGLE_BOOKS_QUERY} from "../graphql/queries.js"
function BookList() {
  const { debouncedSearch} = useAppContext();
  const {loading, error, data} = useQuery(GOOGLE_BOOKS_QUERY,{
    variables:{bookName: debouncedSearch},
    skip:!debouncedSearch
  })
  return (
    <div>
      {loading ? (
        <AppSpinner />
      ) : (
        console.log(data)
        // <div className={styles.bookCardsContainer}>
        //   {books &&
        //     books.map((curr_book) => (
        //       <BookCard book={curr_book} key={curr_book.id} />
        //     ))}
        // </div>
      )}
    </div>
  );
}

export default BookList;
