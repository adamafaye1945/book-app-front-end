import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./BookCard.module.css";

function BookCard({book}) {
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
