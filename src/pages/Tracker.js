import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
import Rating from "../components/Rating";
function Tracker() {
  const [show, setShow] = useState(false);
  const [trackedBook, setTrackedBook] = useState(null);
  const [bookAtRate, setBookAtRate] = useState(null);
  const [size, setSize] = useState(localStorage.length);
  function handleClose(id) {
    setShow(!show);
    const clickedItem = JSON.parse(localStorage.getItem(id));
    setBookAtRate(clickedItem);
  }
  function handleDelete(id) {
    localStorage.removeItem(id);
    setSize(localStorage.length)
  }
  useEffect(
    function () {
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
    },
    [size]
  );

  return (
    <div className={styles.tracker}>
      <AppNavbar />
      {trackedBook && (
        <>
          <div className={styles.bookCardsContainer}>
            {trackedBook.map((book) => (
              <BookCard
                book={book}
                rate={() => handleClose(book.bookId)}
                stop = {() =>handleDelete(book.bookId)}
                key={book.bookId}
              />
            ))}
          </div>
          {bookAtRate && (
            <Rating book={bookAtRate} show={show} handleClose={handleClose} />
          )}
        </>
      )}
    </div>
  );
}

export default Tracker;
