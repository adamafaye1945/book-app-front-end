import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authentification";

const Context = createContext();

const booksobj = [
  {
    id: "121212",
    title: "Flowers",
    authors: "Vijaya Khisty Bodach",
    isbn: "9780736896191",
    imageUrl:
      "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api",
  },
];

function ContextProvider({ children }) {
  const { user } = useAuthContext();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const GOOGLEAPIURL = "https://www.googleapis.com/books/v1/volumes";
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(booksobj);

  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  function updateBookReflection(book, userReflection, rating) {
    sessionStorage.setItem(
      book.bookId,
      JSON.stringify({
        ...book,
        reflection: userReflection,
        userRating: rating,
        reviewed: true,
      })
    );
  }
  async function storeSessionBooksInDB() {
    setLoading(true);
    const data_bulk = [];
    // storing every book in session in data_bulk array and stringify it
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== "React::DevTools::lastSelection" && key !== "current_user") {
        const session_book = JSON.parse(sessionStorage.getItem(key));
        const booksData = {
          bookId: session_book.bookId,
          title: session_book.title,
          imageUrl: session_book.imageUrl,
          averageRating: 4,
          author_name: session_book.authors[0],
        };
        data_bulk.push(booksData);
      }
    }
    console.log(data_bulk);
    if (data_bulk.length === 0) return;
    // in case of refresh
    let access_token;
    if (!user.details) {
      access_token = JSON.parse(sessionStorage.getItem("current_user"));
    }
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    function () {
      setLoading(true);
      const debounce = setTimeout(async () => {
        try {
          if (!search) return;

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
              authors: authors,
              imageUrl: `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api`,
            });
          }
          setBooks(newObj);
        } catch {
          console.log("error fetching ");
        } finally {
          setLoading(false);
        }
      }, 600);

      return () => clearTimeout(debounce);
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
        setLoading,
        setHover,
        hover,
        setRating,
        rating,
        reflection,
        setReflection,
        updateBookReflection,
        loading,
        storeSessionBooksInDB
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
