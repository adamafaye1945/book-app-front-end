import { Nav, Container, Navbar } from "react-bootstrap";
import styles from "./AppNavbar.module.css";
function AppNavbar() {
  return (
    <Navbar className={styles.bgColor}>
      <Container>
        <Navbar.Brand href="#home">BookTracker 📚</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Signup</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
