import { Button } from "react-bootstrap";
import styles from "./AppButton.module.css";
function AppButton({ children, type, classAdded }) {
  return (
    <div>
      <Button variant="outline-custom" className={`${styles[type]} ${classAdded}`}>
        {children}
      </Button>
    </div>
  );
}

export default AppButton;
