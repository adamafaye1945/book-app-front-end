import { Nav, Container, Navbar } from "react-bootstrap";
import styles from "./AppNavbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import Profile from "./Profile";

function AppNavbar() {
  const location = useLocation();
  return (
    <Navbar className={styles.bgColor}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          BookTracker 📚
        </Navbar.Brand>
        {location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ? (
          <Nav className="justify-content-end">
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>

            <Nav.Link as={NavLink} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link></Nav.Link>
          </Nav>
        ) : (
          <>
            <Nav variant="tabs" className={styles.tabs}>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/app/search" >
                  Search
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/app/tracker">
                  Tracker
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Nav.Item>
                <Profile />
              </Nav.Item>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
