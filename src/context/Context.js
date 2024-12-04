import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuthContext } from "./authentification";

const Context = createContext();

// const booksobj = [
//   {
//     id: "121212",
//     title: "Flowers",
//     authors: "Vijaya Khisty Bodach",
//     isbn: "9780736896191",
//     imageUrl:
//       "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api",
//   },
// ];

function ContextProvider({ children }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [books, setBooks] = useState();
  const { user, setUser } = useAuthContext();
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessages] = useState([]);
  const [currentRecipientId, setCurrentRecipientId] = useState(null);
  const [display, setDisplay] = useState("");
  const [friend_messageDisplay, setfriend_messageDisplay] = useState(true);
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
  async function generateChatId(senderId, recipientId) {
    const ids = [senderId, recipientId].sort();
    const concatenatedIds = new TextEncoder().encode(ids.join("-"));
    const hashBuffer = await crypto.subtle.digest("SHA-256", concatenatedIds);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  async function send_message(user_message, receiver_id) {
    const id = await generateChatId(user.details.id, receiver_id);
    const params = {
      chat_id: id,
      sender_id: user.details.id,
      receiver_id,
      message: user_message,
    };
    try {
      const response = await fetch(
        "https://adamafaye1945.pythonanywhere.com/send_message",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(params),
        }
      );
      const data = await response.json();
    } catch {
      console.log("error sending message");
    }
  }
  useEffect(() => {
    const fetchChatIdAndSubscribe = async () => {
      if (!user?.details?.id || !currentRecipientId) {
        console.log("Missing user ID or recipient ID");
        return;
      }

      try {
        const chat_id = await generateChatId(
          user.details.id,
          currentRecipientId
        );
        const q = query(collection(db, `chats/${chat_id}/messages`));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Messages received:", messagesArray);
          setMessages(messagesArray);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error generating chat ID or fetching messages:", error);
      }
    };

    fetchChatIdAndSubscribe();
  }, [user, currentRecipientId]);

  // useEffect(
  //   function () {
  //     setLoading(true);
  //     const debounce = setTimeout(async () => {
  //       try {
  //         if (!search) return;

  //         const res = await fetch(`${GOOGLEAPIURL}?q=${search}`);
  //         const data = await res.json();
  //         console.log(data);
  //         const bookItem = data.items;
  //         const newObj = [];
  //         for (const item of bookItem) {
  //           const { volumeInfo: book_data, id } = item;
  //           const { title, authors } = book_data;
  //           newObj.push({
  //             id,
  //             title,
  //             authors: authors,
  //             imageUrl: `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api`,
  //           });
  //         }
  //         setBooks(newObj);
  //       } catch {
  //         console.log("error fetching ");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }, 600);

  //     return () => clearTimeout(debounce);
  //   },
  //   [search]
  // );
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(handler);
  }, [search]);
  return (
    <Context.Provider
      value={{
        navigator,
        search,
        setSearch,
        debouncedSearch,

        books,
        setBooks,
        setLoading,
        setHover,
        hover,
        setRating,
        rating,
        reflection,
        setReflection,
        updateBookReflection,
        loading,
        message,
        send_message,
        currentRecipientId,
        setCurrentRecipientId,
        display,
        setDisplay,
        friend_messageDisplay,
        setfriend_messageDisplay,
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
