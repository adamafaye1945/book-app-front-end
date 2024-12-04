import { gql } from "@apollo/client";

export const GOOGLE_BOOKS_QUERY = gql`
  query GetBookQuery($bookName: String) {
    getVolumeInfo(bookName: $bookName) {
      volumeInfo {
        title
        authors
        imageLinks {
          thumbnail
          smallThumbnail
        }
      }
    }
  }
`;
