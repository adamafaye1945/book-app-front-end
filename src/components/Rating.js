import Offcanvas from "react-bootstrap/Offcanvas";
import { Form } from "react-bootstrap";
import AppButton from "./AppButton";
import styles from "./Rating.module.css";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/Context";

function Rating({ book, show, handleClose }) {
  const { rating, reflection, setReflection, updateBookReflection } =
    useAppContext();
  function handleSubmit() {
    if (!rating || !reflection) return;
    updateBookReflection(book, reflection, rating);
    handleClose();
    setReflection("");
  }
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {book.title} by {book.authors}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img src={book.imageUrl} alt="" />
          {!book.reflection ? (
            <div className={styles.form}>
              <Form>
                <Form.Group>
                  <Form.Label>Give your quick reflection</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                </Form.Group>
                <Form.Text>
                  {book.averageRating === undefined
                    ? `No reported average rating for ${book.title} `
                    : `${book.title} has an average rating of ${book.averageRating} `}
                  <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
                </Form.Text>
                <StarRating />
                <AppButton type="rate" action={handleSubmit}>
                  RATE!{" "}
                </AppButton>
              </Form>
            </div>
          ) : (
            <div style={{ marginTop: "40px", maxWidth: "fit-content " }}>
              <p>Your reflection: {book.reflection}</p>
              <p>
                You gave the book a {book.userRating}{" "}
                <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
              </p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Rating;
