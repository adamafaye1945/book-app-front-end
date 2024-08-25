import { FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
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
  const [resultsVisible, setResultsVisible] = useState(false);
  const test = [
    {
      name: "adama",
      photo: "../d.webp",
    },
    {
      name: "coumba",
      photo: "../d.webp",
    },
  ];
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
            {test &&
              test.map((user) => (
                <Result name={user.name} image={user.photo} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default SearchFriend;
