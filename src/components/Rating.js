import Offcanvas from "react-bootstrap/Offcanvas";
import { Form } from "react-bootstrap";
import AppButton from "./AppButton";
import styles from "./Rating.module.css";
import StarRating from "./StarRating";
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
          <div className={styles.form}></div>
          <Form>
            <Form.Group>
              <Form.Label>Give your quick reflection</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <StarRating />
            <AppButton type="rate">RATE! </AppButton>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Rating;
