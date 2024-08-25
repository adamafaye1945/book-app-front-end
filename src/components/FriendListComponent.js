import { useAppContext } from "../context/Context";
import styles from "./friendlist.module.css";
import AppNavbar from "./AppNavbar";
import Friend from "./Friend";
import SearchFriend from "./SearchFriend";
import MessageBox from "./MessageBox";

function FriendList() {
  const friends = ["adama", "coumba", "fatou", "sew","sww"];
  const recipient = {
    name: "adama",
    image: "../d.webp"
  }
  return (
    <div className={styles.friendMessageClass}>
      <div>
        {friends.map((friend) => (
          <Friend name={friend} />
        ))}
      </div>
      <div>
        <MessageBox recipient={recipient}/>
      </div>
    </div>
  );
}
export default FriendList;
