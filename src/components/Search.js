import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { useAppContext } from "../context/Context";
import styles from "./Search.module.css";
import AppButton from "./AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { useAuthContext } from "../context/authentification";
import Guide from "./Guide";
import { useState } from "react";

function Search() {
  const { user } = useAuthContext();
  const searchMessage =
    "10 books are generated below, type author or book or both !";
  const { search, setSearch, setBooks } = useAppContext();

  function clearSearch() {
    setSearch("");
    setBooks(null);
  }
  //debouncing the search

  // after debouncing

  return (
    <div>
      <div className={styles.guide}>
        <Guide message={searchMessage} type="guide" />
      </div>

      <div className={styles.search}>
        <h1>Hello, {user.details.name}</h1>
        <h2>Book Search Engine 📕 </h2>
      </div>

      <Form className={styles.form}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Search any book or authors
          </Form.Label>
          <Col sm="7">
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
          <Col sm="3">
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
