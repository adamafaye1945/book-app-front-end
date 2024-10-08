import { Button } from "react-bootstrap";
import styles from "./AppButton.module.css";
import { NavLink } from "react-router-dom";

function AppButton({
  children,
  type,
  classAdded,
  useAs,
  dest,
  action,
  tracked,
  reviewed,
  style,
  saved,
  added
}) {
  const buttonClasses = `${styles[type]} ${classAdded} `;

  return (
    <div>
      <Button
        as={useAs === "NavLink" ? NavLink : ""}
        to={dest}
        variant="outline-custom"
        className={buttonClasses}
        onClick={action}
        disabled={tracked || reviewed|| saved || added}
        style={style}
      >
        {children}
      </Button>
    </div>
  );
}

export default AppButton;
