import { Form } from "react-bootstrap";
import styles from "./form.module.css";
import AppButton from "../components/AppButton";
import AppNavbar from "../components/AppNavbar";

function Signup() {
  return (
    <>
      <AppNavbar />
      <div className={styles.main}>
        <div className={styles.formContainer}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter Username</Form.Label>
              <Form.Control placeholder="enter username"></Form.Control>
            </Form.Group>

            <Form.Group style={{marginTop:"10px"}}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
              ></Form.Control>
            </Form.Group>

            <div className={styles.buttonGroup}>
              <AppButton type="signup">Sign Up</AppButton>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
