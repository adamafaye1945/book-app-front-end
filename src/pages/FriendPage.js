import AppNavbar from "../components/AppNavbar";
import FriendList from "../components/FriendListComponent";
import ProfileComponent from "../components/ProfileComponent";
import SearchFriend from "../components/SearchFriend";
import styles from "../components/friendlist.module.css";
function FriendPage() {
  return (
    <div className={styles.list}>
      <AppNavbar />
      <ProfileComponent />
      
      <FriendList />
    </div>
  );
}
export default FriendPage;
