import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const Context = createContext();

// const USER = {
//   name: "adama",
//   email: "adama1945@hotmail.com",
//   password: "pass",
// };

function Authentification({ children }) {
  const [user, setUser] = useState({
    details: null,
    authenticated: false,
  });
  const [error, setError] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  async function authenticate() {
    //api to authenticate will be here for now, we use obj
    try {
      setLoading(true)
      const res = await fetch(
        `https://adamafaye1945.pythonanywhere.com/login?email=${loginEmail}&password=${loginPassword}`
      );
      if (!res.ok) {
        throw new Error("no user found");
      }
      const data = await res.json();
      const userObj = data.user
      console.log(userObj)
      if (userObj) {
        setUser({
          details: userObj,
          authenticated: true,
        });
        navigator("app/search");
        return;
      }
    } catch {
      setError(true);
    }finally{
      setLoading(false)
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
