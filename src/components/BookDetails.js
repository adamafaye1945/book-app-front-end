import { Card } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import styles from "./BookDetails.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/Context";
import AppButton from "./AppButton.js";
import { useAuthContext } from "../context/authentification";

function BookDetails() {
  const { id } = useParams();
  const { GOOGLEAPIURL: url } = useAppContext();
  const [displayedBook, setDisplayedBook] = useState();
  const {user} = useAuthContext()
  async function storeBookInDatabase() {
    if (!displayedBook) return;
    const bookStored = { ...displayedBook, tracked: true };
    const booksData = {
      bookId: displayedBook.bookId,
      title: displayedBook.title,
      imageUrl: displayedBook.imageUrl,
      averageRating: 4,
      author_name: displayedBook.authors[0],
    };

    try {
      await fetch("https://adamafaye1945.pythonanywhere.com/add_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.details.access_token}`
        },
        body: JSON.stringify(booksData),
      }).then((response) => console.log(response.text()));
    } catch (error) {
      console.log(error);
    }
    console.log(bookStored);
    localStorage.setItem(displayedBook.bookId, JSON.stringify(bookStored));
    setDisplayedBook(bookStored);
  }

  useEffect(
    function () {
      async function fetchBook() {
        try {
          let currentBook = {};
          const res = await fetch(`${url}/${id}`)  ;

          const data = await res.json();
          const volumeInfo = data.volumeInfo;
          const bookId = data.id;
          const { title, authors } = volumeInfo;
          currentBook = {
            bookId,
            title,
            authors,
            tracked: false,
            reflection: "",
            reviewed: false,
            userRating: 0,
          };
          if (volumeInfo.publisher && volumeInfo.publishedDate) {
            const { publisher, publishedDate } = volumeInfo;
            currentBook = { ...currentBook, publisher, publishedDate };
          }
          if (volumeInfo.averageRating) {
            const { averageRating } = volumeInfo;
            currentBook = { ...currentBook, averageRating };
          }
          if (volumeInfo.description) {
            let { description } = volumeInfo;
            description = description.replace(/<[^>]*>/g, "");
            if (description.length > 100) {
              description = description.slice(0, 300) + "....";
            }
            currentBook = { ...currentBook, description };
          }
          const imageUrl = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api`;
          currentBook = { ...currentBook, imageUrl };
          setDisplayedBook(currentBook);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
      if (localStorage.getItem(id)) {
        const storedBook = JSON.parse(localStorage.getItem(id));
        setDisplayedBook(storedBook);
        return;
      }
      fetchBook();
    },
    [id, url]
  );

  return (
    <div className={styles.bookDetails}>
      <AppNavbar />
      {!displayedBook ? (
        <h1>Nothing here</h1>
      ) : (
        <div className={styles.cardContainer}>
          <Card className={styles.details}>
            <div className={styles.cardFlex}>
              <Card.Img
                variant="left"
                src={displayedBook.imageUrl}
                className={styles.cardImage}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Text>{displayedBook.description}</Card.Text>
                <Card.Text>
                  Written by <i>{displayedBook.authors[0]}</i> and published by{" "}
                  {displayedBook.publisher}
                </Card.Text>

                <AppButton
                  tracked={displayedBook.tracked}
                  type={displayedBook.tracked === false ? "details" : "tracked"}
                  action={storeBookInDatabase}
                >
                  {!displayedBook.tracked
                    ? `Track ${displayedBook.title}`
                    : `Already Tracking ${displayedBook.title}`}
                </AppButton>
                <AppButton type="stop" useAs="NavLink" dest="/app/search">
                  Go back{" "}
                </AppButton>
              </Card.Body>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
