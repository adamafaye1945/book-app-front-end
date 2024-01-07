import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Context = createContext();
const GOOGLEAPIURL = "https://www.googleapis.com/books/v1/volumes";
function ContextProvider({ children }) {
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(
    function () {
      async function fetchBook() {
        try {
          const res = await fetch(`${GOOGLEAPIURL}?q=${search}`);
          const data = await res.json();
          console.log(data.items[0].volumeInfo);
        } catch {
          console.log("error fetching ")
        }
      }
      fetchBook();
    },
    [search]
  );
  return (
    <Context.Provider value={{ navigator, search, setSearch }}>
      {children}
    </Context.Provider>
  );
}

function useAppContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("context use outside provider");
  }
  return context;
}

export { ContextProvider, useAppContext };
