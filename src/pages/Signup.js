import { Form, Spinner } from "react-bootstrap";
import styles from "./form.module.css";
import AppButton from "../components/AppButton";
import AppNavbar from "../components/AppNavbar";
import { useState } from "react";
import { useAuthContext } from "../context/authentification";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { addUser, loading, navigator } = useAuthContext();
  async function handleAdding() {
    if (!email || !password || !name) return;
    await addUser(email, password, name);
    navigator("/login");
  }
  return (
    <>
      <AppNavbar />
      <div className={styles.main}>
        <div className={styles.formContainer}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>What's your name</Form.Label>
              <Form.Control
                placeholder="enter a nickname or first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className={styles.buttonGroup}>
              <AppButton type="signup" action={handleAdding}>
                {loading ? <Spinner animation="border" /> : "Sign up"}
              </AppButton>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
