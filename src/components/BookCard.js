import Card from "react-bootstrap/Card";
import styles from "./BookCard.module.css";
import AppButton from "./AppButton";
import { useLocation } from "react-router";

function BookCard({ book, action }) {
  const location = useLocation();

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <Card.Img variant="top" src={book.imageUrl} className={styles.cardImage} />
        <Card.Body>
          <Card.Title>
            {book.title} by {book.authors}
          </Card.Title>
          <Card.Text className={styles.cardText}>
            Some quick example text...
          </Card.Text>
          {location.pathname === "/app/tracker" ? (
            <div className={styles.buttonGroup}>
              <AppButton action={action} type="details">
                Give your Rating
              </AppButton>
              <AppButton type="stop">Stop Tracking</AppButton>
            </div>
          ) : (
            <AppButton type="details" useAs="NavLink" dest={`${book.id}`}>
              view details
            </AppButton>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
