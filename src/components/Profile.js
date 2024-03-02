import { useAuthContext } from "../context/authentification";
import styles from "./Profile.module.css";
import { Dropdown } from "react-bootstrap";
function Profile() {
  const { logOut } = useAuthContext();
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.profile} id="dropdown-basic">
        <img className={styles.image} src="../image.webp" alt="none" />
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Profile;
