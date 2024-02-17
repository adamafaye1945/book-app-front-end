import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
import Rating from "../components/Rating";
import AppButton from "../components/AppButton";
import { useAppContext } from "../context/Context";
import { Spinner } from "react-bootstrap";
function Tracker() {
  const [show, setShow] = useState(false);
  const [trackedBook, setTrackedBook] = useState(null);
  const [bookAtRate, setBookAtRate] = useState(null);
  const [allSaved, setAllSaved] = useState(false)
  const { loading, storeSessionBooksInDB } = useAppContext();

  // track size of local storage
  const [size, setSize] = useState(sessionStorage.length);

  function handleClose(id) {
    setShow(!show);
    // show is going to be true but have to get clicked item before
    // if it was true, its  just for closing the off canvas
    if (show === false) {
      const clickedItem = JSON.parse(sessionStorage.getItem(id));
      setBookAtRate(clickedItem);
    }
  }

  function handleDelete(id) {
    sessionStorage.removeItem(id);
    setSize(sessionStorage.length);
  }
  function handleStoringInDnb(){
    storeSessionBooksInDB()
    setAllSaved(true)
  }
  useEffect(
    function () {
      function fetchStoredBook() {
        const books = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (
            key !== "React::DevTools::lastSelection" &&
            key !== "current_user"
          ) {
            const book = JSON.parse(sessionStorage.getItem(key));
            books.push(book);
          }
        }
        setTrackedBook(books);
        setAllSaved(false);
      }
      fetchStoredBook();
    },
    [size, show]
  );

  return (
    <div className={styles.tracker}>
      <AppNavbar />
      <div className={styles.saveBtn}>
        <AppButton
          type="details"
          action={handleStoringInDnb}
          saved={allSaved}
        >
          {loading ? (
            <Spinner animation="border" />
          ) : allSaved ? (
            "All Saved"
          ) : (
            "Save your books"
          )}
        </AppButton>
      </div>

      {trackedBook && (
        <>
          <div className={styles.bookCardsContainer}>
            {trackedBook.map((book) => (
              <BookCard
                book={book}
                rate={() => handleClose(book.bookId)}
                stop={() => handleDelete(book.bookId)}
                view={() => handleClose(book.bookId)}
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
