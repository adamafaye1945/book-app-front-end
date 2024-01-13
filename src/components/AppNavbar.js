import { Nav, Container, Navbar } from "react-bootstrap";
import styles from "./AppNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/Context";
function AppNavbar() {
  const { loggedIn } = useAppContext();
  return (
    <Navbar className={styles.bgColor}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          BookTracker 📚
        </Navbar.Brand>
        {!loggedIn ? (
          <Nav className="justify-content-end">
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>

            <Nav.Link as={NavLink} to="/signup">
              Signup
            </Nav.Link>
          </Nav>
        ) : (
          <Nav variant="tabs" className={styles.tabs}>
            <Nav.Item>
              <Nav.Link>Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Tracker</Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
