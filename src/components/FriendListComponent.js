import { useAppContext } from "../context/Context";
import styles from "./friendlist.module.css";
import AppNavbar from "./AppNavbar";
import Friend from "./Friend";
import SearchFriend from "./SearchFriend";
import MessageBox from "./MessageBox";
import { useAuthContext } from "../context/authentification";
import { useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";

function FriendList() {
  useEffect(() => {
    setFriends(JSON.parse(sessionStorage.getItem("current_user")).user_friends);
  }, []);

  const { setFriends, friends } = useAuthContext();
  const { currentRecipientId, display, setDisplay } = useAppContext();

  const recipient = friends.filter(
    (friend) => friend.userid == currentRecipientId
  );

  return (
    <div className={styles.friendMessageClass}>
      {display == "Friends" &&
        friends.map((friend) => (
          <Friend name={friend.name} id={friend.userid} />
        ))}
      {display == "Search Friend" && <SearchFriend />}

      {/* <div>
        <SearchFriend />
        {friends.map((friend) => (
          <Friend
            displayMB={displayMessageBox}
            setdisplayMB={setDisplayMessageBox}
            name={friend.name}
            id={friend.userid}
          />
        ))}
      </div>
      <div style={{ height: "80vh" }}>
        {(recipient.length !== 0) & displayMessageBox ? (
          <MessageBox recipient={recipient[0]} />
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
} /// try to toogle message
export default FriendList;
