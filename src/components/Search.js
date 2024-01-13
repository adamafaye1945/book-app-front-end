import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { useAppContext } from "../context/Context";
import styles from "./Search.module.css";
import AppButton from "./AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

function Search() {
  const { setSearch, search } = useAppContext();
  return (
    <div>
      <h1>Search books</h1>
      <Form className={styles.form}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Search Any book{" "}
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
            <AppButton type="search">CLEAR SEARCH</AppButton>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Search;
