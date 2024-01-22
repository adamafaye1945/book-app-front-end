import styles from "./Profile.module.css";
import { Dropdown } from "react-bootstrap";
function Profile() {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.profile} id="dropdown-basic">
        <img className={styles.image} src="../image.webp" alt="none" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >About Me</Dropdown.Item>
        <Dropdown.Item >Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Profile;
