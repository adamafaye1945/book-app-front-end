import { Form } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import AppButton from "../components/AppButton";
import styles from "./form.module.css";
import { useAuthContext } from "../context/authentification";
function Login() {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    authenticate,
    error,
  } = useAuthContext();

  function handleAuth() {
    if (!loginEmail || !loginPassword) return;
    authenticate()
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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className={styles.buttonGroup}>
              <AppButton type="login" action={handleAuth}>
                Login
              </AppButton>
              <AppButton type="signup">Sign Up</AppButton>
            </div>
          </Form>
          {error && (
            <p style={{ color: "red" }}>
              ****Invalid user credentials or unknown user. Sign up for
              free!*****
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
