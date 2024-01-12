import { Button } from "react-bootstrap";
import styles from "./AppButton.module.css";
import { NavLink } from "react-router-dom";


function AppButton({ children, type, classAdded, useAs, dest, action, tracked}) {
  const buttonClasses = `${styles[type]} ${classAdded} `;

  return (
    <div>
      <Button
        as={useAs === "NavLink" ? NavLink : ""}
        to={dest}
        variant="outline-custom"
        className={buttonClasses}
        onClick={action}
        disabled = {tracked}
      >
        {children}
      </Button>
    </div>
  );
}

export default AppButton;
