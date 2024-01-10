import { Col, Form,Row } from "react-bootstrap";
import { useAppContext } from "../context/Context";
import styles from './Search.module.css'
import AppButton from "./AppButton";

function Search() {
    const {setSearch, search} = useAppContext()
  return (
    <div>
      <h1>Search books</h1>
      <Form className={styles.form}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Search Any book by name or Author
          </Form.Label>
          <Col sm="5">
            <Form.Control
              placeholder="Books name, Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
