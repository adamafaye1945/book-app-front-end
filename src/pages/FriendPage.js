import AppNavbar from "../components/AppNavbar";
import FriendList from "../components/FriendListComponent";
import SearchFriend from "../components/SearchFriend";
import styles from "../components/friendlist.module.css"
function FriendPage(){
    return (
        <div className={styles.list}>

            <AppNavbar/>
            <SearchFriend/>
            <FriendList/>
        </div>
    )
}
export default FriendPage;