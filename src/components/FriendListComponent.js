import { useAppContext } from "../context/Context";
import styles from "./friendlist.module.css"
import AppNavbar from "./AppNavbar";
import Friend from "./Friend";

function FriendList() {
  return (
    <div className={styles.list}>
      <AppNavbar/>
      
      <Friend name="adama" />
    </div>
  );
}
export default FriendList;
