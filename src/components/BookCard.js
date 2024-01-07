import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./BookCard.module.css";
const book = {
  title: "Flowers",
  authors: "Vijaya Khisty Bodach",
  isbn: "9780736896191",
  image:
    "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api",
};
function BookCard() {
  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <Card.Img variant="top" src={book.image} className={styles.cardImage} />
        <Card.Body>
          <Card.Title>
            {book.title} by {book.authors}
          </Card.Title>
          <Card.Text className={styles.cardText}>
            Some quick example text...
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
