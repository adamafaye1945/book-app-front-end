import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
import Rating from "../components/Rating";
import Guide from "../components/Guide";
function Tracker() {
  const [show, setShow] = useState(false);
  const [trackedBook, setTrackedBook] = useState([]);
  const [bookAtRate, setBookAtRate] = useState(null);

  // track size of local storage
  const [size, setSize] = useState(sessionStorage.length);
  const guideMessage =
    "This is your tracker page rate and reflect on your book here. Remember to log out to save your progress. Closing page won't save progress.";
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
    //deletion is done by giving a object value untrack
    const item = JSON.parse(sessionStorage.getItem(id))
    const new_item = {...item, tracked: false}
    sessionStorage.setItem(id, JSON.stringify(new_item));
    setSize(size -1 );
  }
  // function handleStoringInDnb() {
  //   storeSessionBooksInDB();
  //   setAllSaved(true);
  // }
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
            if (book.tracked)
              books.push(book);
          }
        }
        setTrackedBook(books);
   
      }
      fetchStoredBook();
    },
    [size, show]
  );

  return (
    <div className={styles.tracker}>
      <AppNavbar />
      <div className={styles.saveBtn}>
        <Guide message={guideMessage} />
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
