import { useAppContext } from "../context/Context";
import styles from "./friendlist.module.css";
import AppNavbar from "./AppNavbar";
import Friend from "./Friend";
import SearchFriend from "./SearchFriend";
import MessageBox from "./MessageBox";
import { useAuthContext } from "../context/authentification";
import { useEffect } from "react";

function FriendList() {
  useEffect(() => {
    setFriends(JSON.parse(sessionStorage.getItem("current_user")).user_friends);
  }, []);
  const { setFriends, friends } = useAuthContext();
  const recipient = {
    name: "adama",
    image: "../d.webp",
  };
  
  return (
    <div className={styles.friendMessageClass}>
      <div>
        {friends.map((friend) => (
          <Friend name={friend.name} />
        ))}
      </div>
      <div>
        <MessageBox recipient={recipient} />
      </div>
    </div>
  );
}
export default FriendList;
