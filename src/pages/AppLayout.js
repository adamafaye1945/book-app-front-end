import { Col, Form, Row } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import AppButton from "../components/AppButton";
import styles from "./AppLayout.module.css";
import BookCard from "../components/BookCard";
import { useAppContext } from "../context/Context";

function AppLayout() {
  const { setSearch, search } = useAppContext();
  console.log(search);
  return (
    <>
      <AppNavbar />
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
        <BookCard />
      </div>
    </>
  );
}

export default AppLayout;
