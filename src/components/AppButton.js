import { Button } from "react-bootstrap";
import styles from "./AppButton.module.css";
import { NavLink } from "react-router-dom";


function AppButton({ children, type, classAdded, useAs, dest }) {
  return (
    <div>
      <Button
        as={useAs === "NavLink" ? NavLink : ""}
        to={dest}
        variant="outline-custom"
        className={`${styles[type]} ${classAdded}`}
      >
        {children}
      </Button>
    </div>
  );
}

export default AppButton;
