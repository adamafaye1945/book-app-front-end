import { Nav, Container, Navbar } from "react-bootstrap";
import styles from "./AppNavbar.module.css";
import { NavLink } from "react-router-dom";
function AppNavbar() {
  return (
    <Navbar className={styles.bgColor}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          BookTracker 📚
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>

          <Nav.Link as={NavLink}>Signup</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
