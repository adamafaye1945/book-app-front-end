import { createContext, useContext, useEffect, useState } from "react";

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
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const GOOGLEAPIURL = "https://www.googleapis.com/books/v1/volumes";

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(booksobj);

  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  function updateBookReflection(book, userReflection, rating) {
    localStorage.setItem(
      book.bookId,
      JSON.stringify({
        ...book,
        reflection: userReflection,
        userRating: rating,
        reviewed: true,
      })
    );
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

        setHover,
        hover,
        setRating,
        rating,
        reflection,
        setReflection,
        updateBookReflection,
        loading,
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
