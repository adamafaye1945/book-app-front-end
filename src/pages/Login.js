import { Form } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import styles from "./Login.module.css";
import AppButton from "../components/AppButton";
function Login() {
  return (
    <>
      <AppNavbar />
      <div className={styles.login}>
        <div className={styles.formContainer}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
              ></Form.Control>
            </Form.Group>
            <div className={styles.buttonGroup}>
              <AppButton type="login">Login</AppButton>
              <AppButton type="signup">Sign Up</AppButton>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
