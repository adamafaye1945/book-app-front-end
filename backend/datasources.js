const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: "/Users/faye/Desktop/book-app-frontend/backend/.env" });

class BookApi {
  constructor() {
    this.baseURL = process.env.GOOGLE_API_URL;
  }

  async getBookInfo(bookName) {
    try {
      const response = await axios.get(`${this.baseURL}volumes?q=${bookName}`);
      return response.data; // Modify as needed to match your schema
    } catch (error) {
      console.error("Error fetching book info:", error.message);
      throw new Error("Failed to fetch book information");
    }
  }
}
module.exports = BookApi;
