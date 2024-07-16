import AppButton from "./AppButton";
import styles from "./Friend.module.css";
function Friend({ name }) {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <img
          src="../d.webp"
          alt="Photo"
          style={{ width: "80%", height: "80%", objectFit: "cover", borderRadius:"50%"}}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.buttons}>
          <AppButton type="details">message</AppButton>
          <AppButton type="stop">Unfriend</AppButton>
        </div>
      </div>
    </div>
  );
}
export default Friend;
