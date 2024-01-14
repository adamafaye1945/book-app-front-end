import AppNavbar from "../components/AppNavbar";
import BookCard from "../components/BookCard";
import styles from "./Tracker.module.css";
function Tracker() {
  
  const book = {
    id: "121212",
    title: "Flowers",
    authors: "Vijaya Khisty Bodach",
    isbn: "9780736896191",
    image:
      "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api",
  };
  return (
    <div className={styles.tracker}>
      <AppNavbar />
      <div className={styles.bookCardsContainer}>
        <BookCard book={book} />
      </div>
    </div>
  );
}

export default Tracker;
