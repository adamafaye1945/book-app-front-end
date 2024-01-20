import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { useAppContext } from "../context/Context";
import styles from "./Search.module.css";
import AppButton from "./AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

function Search() {
  const { setBooks, setSearch, search } = useAppContext();
  function clearSearch() {
    setSearch("");
    setBooks(null);
  }
  return (
    <div>
      <h1 className={styles.search}>Search books 📕</h1>

      <Form className={styles.form}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Search any book or authors
          </Form.Label>
          <Col sm="5">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearchengin} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Books name, Author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col sm="5">
            <AppButton type="search" action={clearSearch}>
              CLEAR SEARCH
            </AppButton>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Search;
