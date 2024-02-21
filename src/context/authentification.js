import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Context = createContext();

// const USER = {
//   name: "adama",
//   email: "adama1945@hotmail.com",
//   password: "pass",
// };

function Authentification({ children }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

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
      const { name, access_token } = userObj;
      const current_user = { name, access_token };

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
          })
        );
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
      await fetch("https://adamafaye1945.pythonanywhere.com/add_user", {
        method: "POST",
        body: user,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function logOut() {
    sessionStorage.setItem("current_user", null);
    setUser({
      details: null,
      authenticated: false,
    });
    navigator("/");
  }
  useEffect(function () {
    if (sessionStorage.getItem("current_user")) {
      setUser(JSON.parse(sessionStorage.getItem("current_user")));
      return;
    }
    sessionStorage.setItem(
      "current_user",
      JSON.stringify({ details: null, authenticated: false })
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
          error,
          loading,
          addUser,
          navigator,
          logOut,
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
