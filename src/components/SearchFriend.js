import { FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/authentification";
function Result({ name, image }) {
  
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
      <FontAwesomeIcon
        style={{
          marginTop: "20px",
        }}
        icon={faUserPlus}
      />
    </div>
  );
}
function SearchFriend() {
  const { setSearchingUser, searchedUser } = useAuthContext();
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
            onFocus={() => setResultsVisible(true)}
            onBlur={() => setResultsVisible(false)}
            onChange={(e) => setSearchingUser(e.target.value)}
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
            {searchedUser &&
              searchedUser.map((user) => (
                <Result name={user.name} image={"../d.webp"} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default SearchFriend;
