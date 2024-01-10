import AppNavbar from "../components/AppNavbar";

import Search from "../components/Search";
import BookList from "../components/BookList.js";

function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Search />
      <BookList />
    </>
  );
}

export default AppLayout;
