import { useAppContext } from "../context/Context";
import AppButton from "./AppButton";
import styles from "./ProfileComponent.module.css";
function ProfileComponent() {
  const { setDisplay } = useAppContext();
  function navbardisplayer(event) {
    const value = event.target.value;
    setDisplay(value);
  }
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileBanner}>
        <div className={styles.profileInfo}>
          <img src="../d.webp" alt="Profile" className={styles.profileAvatar} />
          <div>
            <h2>Adama</h2>
            <p>description</p>
          </div>
        </div>
        <AppButton type="details">Edit Profile</AppButton>
      </div>
      <nav className={styles.profileNav}>
        <AppButton value={"Friends"} action={navbardisplayer} type="details">
          Friends
        </AppButton>
        <AppButton value={"Favorite books"} type="details">
          Favorite books
        </AppButton>
        <AppButton value={"Request"} action={navbardisplayer} type="details">
          Request
        </AppButton>
        <AppButton
          value={"Search Friend"}
          action={navbardisplayer}
          type="details"
        >
          Search Friend
        </AppButton>
      </nav>
    </div>
  );
}

export default ProfileComponent;
