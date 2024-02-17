import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
import Rating from "../components/Rating";
import { useAuthContext } from "../context/authentification";
import AppButton from "../components/AppButton";
import { useAppContext } from "../context/Context";
import { Spinner } from "react-bootstrap";
function Tracker() {
  const [show, setShow] = useState(false);
  const [trackedBook, setTrackedBook] = useState(null);
  const [bookAtRate, setBookAtRate] = useState(null);
  const [allSaved, setAllSaved] = useState(false);
  const { loading, setLoading } = useAppContext();
  const { user } = useAuthContext();

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
  async function storeSessionBooksInDB() {
    setLoading(true);
    const data_bulk = [];
    // storing every book in session in data_bulk array and stringify it
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== "React::DevTools::lastSelection" && key !== "current_user") {
        const session_book = JSON.parse(sessionStorage.getItem(key));
        const booksData = {
          bookId: session_book.bookId,
          title: session_book.title,
          imageUrl: session_book.imageUrl,
          averageRating: 4,
          author_name: session_book.authors[0],
        };
        data_bulk.push(booksData);
      }
    }
    console.log(data_bulk);
    if (data_bulk.length === 0) return;
    // in case of refresh
    let access_token;
    if (!user.details) {
      access_token = JSON.parse(sessionStorage.getItem("current_user"));
    }
    try {
      await fetch("https://adamafaye1945.pythonanywhere.com/add_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(data_bulk),
      });
      setAllSaved(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          action={storeSessionBooksInDB}
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
