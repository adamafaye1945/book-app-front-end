import AppNavbar from "../components/AppNavbar";
import styles from "./Homepage.module.css";
import AppButton from "../components/AppButton";

function Homepage() {
  return (
    <div>
      <AppNavbar />
      <div className={styles.homepage}>
        <span>
          Welcome to the BookTracker! Track all the book you are reading and
          more
        </span>
        <AppButton useAs="NavLink" dest="/app" type="start">
          START APPLICATION NOW
        </AppButton>
      </div>
    </div>
  );
}

export default Homepage;
