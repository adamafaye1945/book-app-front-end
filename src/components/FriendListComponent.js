import { useAppContext } from "../context/Context";
import styles from "./friendlist.module.css";
import AppNavbar from "./AppNavbar";
import Friend from "./Friend";
import SearchFriend from "./SearchFriend";
import MessageBox from "./MessageBox";
import { useAuthContext } from "../context/authentification";
import { useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";
import Request from "./Request";

function FriendList() {
  const { setFriends, friends } = useAuthContext();
  const { currentRecipientId, display, friend_messageDisplay } =
    useAppContext();
  useEffect(() => {
    setFriends(JSON.parse(sessionStorage.getItem("current_user")).user_friends);
  }, []);
  const recipient = friends.filter(
    (friend) => friend.userid == currentRecipientId
  );

  return (
    <div>
      {display == "Friends" && (
        <div>
          {friend_messageDisplay ? (
            <div className={styles.friendlist}>
              {friends.map((friend) => (
                <Friend name={friend.name} id={friend.userid} />
              ))}
            </div>
          ) : (
            <div style={{ height: "80vh" }}>
              {recipient.length !== 0 ? (
                <MessageBox recipient={recipient[0]} />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}

      {display == "Search Friend" && (
        <div>
          <SearchFriend />
        </div>
      )}
      {display == "Request" && (
        <Request/>
      )}

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
