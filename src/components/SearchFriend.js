import { FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/authentification";
import AppButton from "./AppButton";
import AppSpinner from "./Spinner";
import { json } from "react-router";
function Result({ name, image, id }) {
  const { createFriendship, friends, setFriends } = useAuthContext();

  function addFriend() {
    setFriends([...friends, { name, image, userid: id }]);
    // usinf sess stoage in caseof reload
    sessionStorage.setItem(
      "current_user",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("current_user")),
        user_friends: [
          ...JSON.parse(sessionStorage.getItem("current_user")).user_friends,
          { name, id },
        ],
      })
    );
    createFriendship(id);
  }
  return (
    <div
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <img
          style={{
            borderRadius: "50%",
            width: "auto",
            maxHeight: "50px",
            marginRight: "20px",
          }}
          src={image}
        />
        <b>{name}</b>
      </div>

      <AppButton
        type="details"
        added={friends.some((item) => item.userid === id)}
        action={addFriend}
      >
        <FontAwesomeIcon
          style={{
            marginTop: "15px",
          }}
          icon={faUserPlus}
        />
      </AppButton>
    </div>
  );
}
function SearchFriend() {
  const { setSearchingUser, searchedUser, loading, friends } = useAuthContext();
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          margin: "40px auto",
        }}
      >
        <FloatingLabel controlId="floatingInput" label="Search friend by name">
          <Form.Control
            type="text"
            placeholder="Search friend by name"
            onChange={(e) => setSearchingUser(e.target.value)}
            onBlur={() => setResultsVisible(false)}
            onFocus={() => setResultsVisible(true)}
            style={{
              borderRadius: "24px",

              padding: "40px 20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </FloatingLabel>

        {resultsVisible && (
          <div
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              borderRadius: "0 0 24px 24px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderTop: "none",
              zIndex: 10,
            }}
          >
            {loading ? (
              <AppSpinner />
            ) : searchedUser.length > 0 ? (
              searchedUser.map((user) => (
                <Result name={user.name} id={user.userid} image={"../d.webp"} />
              ))
            ) : (
              <b style={{ padding: "40px 30px" }}>no user found</b>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default SearchFriend;
