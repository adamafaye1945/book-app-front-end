import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const Context = createContext();

const USER = {
  name: "adama",
  email: "adama1945@hotmail.com",
  password: "pass",
};

function Authentification({ children }) {
  const current_user = {
    details: null,
    authenticated: false,
  };
  const [user, setUser] = useState(current_user);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  function authenticate() {
    //api to authenticate will be here for now, we use obj
    if (email === USER.email && password === USER.password) {
      setUser({
        details: { name: USER.name },
        authenticated: true,
      });
      navigator("/app/search");
      return;
    }
    setError(true);
  }

  return (
    <div>
      <Context.Provider
        value={{ setEmail, setPassword, authenticate, user, error }}
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
