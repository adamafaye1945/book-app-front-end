import { Card } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import styles from "./BookDetails.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/Context";
import AppButton from "./AppButton.js";
function BookDetails() {
  const { id } = useParams();
  const { GOOGLEAPIURL: url } = useAppContext();
  const [displayedBook, setDisplayedBook] = useState();

  function storeBookInDatabase() {
    if (!displayedBook) return;
    setDisplayedBook({...displayedBook, tracked: true})
    localStorage.setItem(displayedBook.bookId, JSON.stringify(displayedBook));
  }


  useEffect(
    function () {
      async function fetchBook() {
        try {
          let currentBook = {};
          const res = await fetch(`${url}/${id}`);

          const data = await res.json();
          const volumeInfo = data.volumeInfo;
          const bookId = data.id;
          const { title, authors } = volumeInfo;
          currentBook = {
            bookId,
            title,
            authors,
            tracked: false
          };
          if (volumeInfo.publisher && volumeInfo.publishedDate) {
            const { publisher, publishedDate } = volumeInfo;
            currentBook = { ...currentBook, publisher, publishedDate };
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
                 
                <AppButton tracked={displayedBook.tracked} type={displayedBook.tracked === false? "details": "tracked"} action={storeBookInDatabase}>
                  {!displayedBook.tracked ? `Track ${displayedBook.title}` 
                  : `Already Tracking ${displayedBook.title}`}
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
