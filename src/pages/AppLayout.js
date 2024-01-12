import AppNavbar from "../components/AppNavbar";

import Search from "../components/Search";
import BookList from "../components/BookList.js";
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <AppNavbar />
      <Search />
      <BookList />
    </div>
  );
}

export default AppLayout;
