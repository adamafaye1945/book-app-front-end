import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Context = createContext();

const booksobj = [
  {
    id: "121212",
    title: "Flowers",
    authors: "Vijaya Khisty Bodach",
    isbn: "9780736896191",
    image:
      "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api",
  },
];

function ContextProvider({ children }) {
  const GOOGLEAPIURL = "https://www.googleapis.com/books/v1/volumes";
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(booksobj);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentAct, setCurrentAct] = useState("search");
  function login() {
    setLoggedIn(true);
  }
  function logout() {
    setLoggedIn(false);
  }
  useEffect(
    function () {
      async function fetchBook() {
        try {
          const res = await fetch(`${GOOGLEAPIURL}?q=${search}`);
          const data = await res.json();
          const bookItem = data.items;
          const newObj = [];
          for (const item of bookItem) {
            const { volumeInfo: book_data, id } = item;
            const { title, authors } = book_data;
            newObj.push({
              id,
              title,
              authors: authors[0],
              image: `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api`,
            });
          }
          setBooks(newObj);

          // const { volumeInfo: book_data } = bookItem[0];
          // const { title, authors } = book_data;
          // console.log(title, authors);
        } catch {
          console.log("error fetching ");
        }
      }
      fetchBook();
    },
    [search]
  );
  return (
    <Context.Provider
      value={{
        navigator,
        search,
        setSearch,
        books,
        setBooks,
        GOOGLEAPIURL,
        loggedIn,
        login,
        logout,
      }}
    >
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
