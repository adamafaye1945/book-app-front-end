import { createContext, useContext } from "react";
import { useNavigate } from "react-router";

const Context = createContext();

function ContextProvider({ children }) {
  const navigator = useNavigate();
  return <Context.Provider value={navigator}>{children}</Context.Provider>;
}

function useAppContext() {
  const context = useContext();
  if (context !== "undefined") {
    throw new Error("context use outside provider");
  }
  return context;
}

export { ContextProvider, useAppContext };
