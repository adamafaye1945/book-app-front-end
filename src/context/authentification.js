import { createContext, useContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router";
const Context = createContext();

function Authentification({ children }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [signupError, setSingupError] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedUser, setSearchedUser] = useState([]);
  const [searchingUser, setSearchingUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [request, setRequest] = useState([]);
  const navigator = useNavigate();

  async function sendRequest(friend_id) {
    try {
      if (friend_id) {
        const access_token = user.details.access_token;
        const res = await fetch(
          `https://adamafaye1945.pythonanywhere.com/sendFriendRequest?receiverId=${friend_id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({})
          }
        );
      }
    } catch {
      console.log("error sending request");
    }
  }
  async function createFriendship(friend_id) {
    try {
      if (friend_id) {
        const access_token = user.details.access_token;
        const res = await fetch(
          "https://adamafaye1945.pythonanywhere.com/add_friend",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friend_id,
            }),
          }
        );
      }
    } catch {
      console("error adding user");
    }
  }
  async function authenticate() {
    //api to authenticate will be here for now, we use obj
    try {
      setLoading(true);
      const res = await fetch(
        `https://adamafaye1945.pythonanywhere.com/login?email=${loginEmail}&password=${loginPassword}`
      );

      if (!res.ok) {
        throw new Error("no user found");
      }
      const data = await res.json();
      const userObj = data;
      const { user_friends, id, name, access_token } = userObj;
      const current_user = { name, access_token, id };

      if (userObj) {
        setUser({
          details: current_user,
          authenticated: true,
        });
        sessionStorage.setItem(
          "current_user",
          JSON.stringify({
            details: current_user,
            authenticated: true,
            user_friends,
            request : []
          })
        );
        const user_book = await fetch(
          "https://adamafaye1945.pythonanywhere.com/get_book",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        const data = await user_book.json();
        for (const element of data.book_data) {
          sessionStorage.setItem(element.bookId, JSON.stringify(element));
        }
        navigator("app/search");
        return;
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  async function addUser(email, password, name) {
    setLoading(true);
    const user = JSON.stringify({
      name,
      email,
      password,
    });
    try {
      const response = await fetch(
        "https://adamafaye1945.pythonanywhere.com/add_user",
        {
          method: "POST",
          body: user,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 409) {
        setSingupError(true);
        setLoading(false);
        return false;
      } else {
        setSingupError(false);
        setLoading(false);
        return true;
      }
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  }
  async function logOut() {
    const data_bulk = [];
    let access_token;
    if (!user.details) {
      if (!JSON.parse(sessionStorage.getItem("current_user")).details) {
        return;
      }
      const current = JSON.parse(sessionStorage.getItem("current_user"));
      access_token = current.details.access_token;
    } else {
      access_token = user.details.access_token;
    }
    // storing every book in session in data_bulk array and stringify it
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== "React::DevTools::lastSelection" && key !== "current_user") {
        const session_book = JSON.parse(sessionStorage.getItem(key));
        const booksData = {
          bookId: session_book.bookId,
          title: session_book.title,
          imageUrl: session_book.imageUrl,
          averageRating: !session_book.averageRating
            ? 0
            : Number(session_book.averageRating),
          author_name: session_book.authors[0],
          userRating: Number(session_book.userRating),
          reflection: session_book.reflection,
          publisher: session_book.publisher,
          untracked: !session_book.tracked,
        };
        data_bulk.push(booksData);
      }
    }

    if (data_bulk.length !== 0) {
      try {
        await fetch("https://adamafaye1945.pythonanywhere.com/add_book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(data_bulk),
        });
      } catch (error) {
        console.log(error);
      }
    }

    sessionStorage.clear();
    sessionStorage.setItem(
      "current_user",
      JSON.stringify({ details: null, authenticated: false, user_friends: [] })
    );
    setUser({
      details: null,
      authenticated: false,
    });
    navigator("/");
  }
  useEffect(() => {
    setLoading(true);
    setSearchedUser([]);
    const debounce = setTimeout(async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("current_user"));
        const access_token = user.details.access_token;
        if (searchingUser) {
          const res = await fetch(
            `https://adamafaye1945.pythonanywhere.com/find?name=${searchingUser}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          if (!res.ok) {
            throw new Error("no user found or server error");
          }
          const data = await res.json();
          setSearchedUser(data.users);
        }
      } catch {
        console.log("error finding user");
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [searchingUser]);
  useEffect(function () {
    if (sessionStorage.getItem("current_user")) {
      setUser(JSON.parse(sessionStorage.getItem("current_user")));
      return;
    }
    sessionStorage.setItem(
      "current_user",
      JSON.stringify({ details: null, authenticated: false, user_friends: [], request : [] })
    );
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          setLoginEmail,
          setLoginPassword,
          loginEmail,
          loginPassword,
          authenticate,
          user,
          setUser,
          error,
          signupError,
          loading,
          setLoading,
          addUser,
          navigator,
          logOut,
          setSearchingUser,
          searchedUser,
          createFriendship,
          friends,
          setFriends,
          sendRequest
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
}
function useAuthContext() {
  const context = useContext(Context);
  if (context === undefined) {
    return;
  }
  return context;
}

export { Authentification, useAuthContext };
