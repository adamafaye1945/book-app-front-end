import Offcanvas from "react-bootstrap/Offcanvas";
import { Form } from "react-bootstrap";
import AppButton from "./AppButton";
import styles from "./Rating.module.css";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function Rating({ book, show, handleClose }) {
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
          <div className={styles.form}>
            <Form>
              <Form.Group>
                <Form.Label>Give your quick reflection</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Text>
                {book.averageRating === undefined
                  ? `No reported average rating for ${book.title}`
                  : `${book.title} has an average rating of ${book.averageRating}`}
                <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
              </Form.Text>
              <StarRating />
              <AppButton type="rate">RATE! </AppButton>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Rating;
