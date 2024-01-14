import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
import Rating from "../components/Rating";
function Tracker() {
  const [show, setShow] = useState(false);
  const [trackedBook, setTrackedBook] = useState(null);
  function handleClose() {
    setShow(!show);
  }
  useEffect(function () {
    function fetchStoredBook() {
      const books = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "debug") {
          const book = JSON.parse(localStorage.getItem(key));
          books.push(book);
        }
      }
      setTrackedBook(books);
    }
    fetchStoredBook();
  }, []);

  return (
    <div className={styles.tracker}>
      <AppNavbar />
      {trackedBook && (
        <div className={styles.bookCardsContainer}>
          {trackedBook.map((book) => (
            <BookCard book={book} action={handleClose} />
          ))}
        </div>
      )}
      {/* <Rating book={book} show={show} handleClose={handleClose} /> */}
    </div>
  );
}

export default Tracker;
