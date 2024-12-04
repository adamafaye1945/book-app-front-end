const resolvers = {
  Query: {
    getVolumeInfo: async (_, { bookName }, { dataSources }) => {
      try {
        const response = await dataSources.bookApi.getBookInfo(bookName);
        if (!response || !response.items) {
          throw new Error("No books found for the given name");
        }
        const data = {
          volumeInfo: response.items.map((item) => item.volumeInfo),
        };

        return data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch book information");
      }
    },
  },
  BookInfo: {
    imageLinks: (volumeInfo) => {
      return {
        thumbnail: volumeInfo.imageLinks.thumbnail,
        smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
      };
    },
  },
};
module.exports = resolvers;
