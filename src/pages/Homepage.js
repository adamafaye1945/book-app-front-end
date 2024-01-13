import AppNavbar from "../components/AppNavbar";
import styles from "./Homepage.module.css";
import AppButton from "../components/AppButton";
import { useAppContext } from "../context/Context";

function Homepage() {
  const { login } = useAppContext();
  return (
    <div>
      <AppNavbar />
      <div className={styles.homepage}>
        <span>
          Welcome to the BookTracker! Track all the book you are reading and
          more
        </span>
        <AppButton useAs="NavLink" dest="/app" type="start" action={login}>
          START APPLICATION NOW
        </AppButton>
      </div>
    </div>
  );
}

export default Homepage;
