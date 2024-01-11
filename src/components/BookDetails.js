import { Card } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import styles from "./BookDetails.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/Context";

function BookDetails() {
  const { id } = useParams();
  const { GOOGLEAPIURL: url } = useAppContext();

  const [displayedBook, setDisplayedBook] = useState();
  useEffect(
    function () {
      async function fetchBook() {
        try {
          let currentBook = {};
          const res = await fetch(`${url}/${id}`);
         
          const data = await res.json();
          const volumeInfo = data.volumeInfo;
          const { title, authors } = volumeInfo;
          currentBook = {
            title,
            authors,
          };
          if (volumeInfo.publisher && volumeInfo.publishedDate) {
            const { publisher, publishedDate } = volumeInfo;
            currentBook = { ...currentBook, publisher, publishedDate };
          }
          if (volumeInfo.description) {
            const { description } = volumeInfo;
            currentBook = { ...currentBook, description };
          }
          const imageUrl = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72fIinM01rF2BJv0lN0cjfq1TvTUyMDzfH-orkIrBXbaAudWJDDFFs44jBNDirmFacHwD5c9vyaDpknntczNHKvTieDh0B9SFuLUloq3y3BAnDbFZyzd4pfu-QeYcc4H7BXLrpT&source=gbs_api`
          currentBook = { ...currentBook, imageUrl };
          console.log(currentBook);
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
    <>
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
              </Card.Body>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default BookDetails;
