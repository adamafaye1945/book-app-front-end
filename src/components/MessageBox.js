import { Form } from "react-bootstrap";
import AppButton from "./AppButton";
import styles from "./message.module.css";

function MessageBox({ recipient }) {
    const conversation = {
        to: {1: "hey", 1:"how are you doing today", 2:"what are you reading"},
        from: {2:"hey", 3:"i fine"}
    }
    return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles.photo}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={recipient.image}
            alt={`${recipient.name}'s avatar`}
          />
        </div>
        <p style={{ fontWeight: "bold", fontSize: "20px", margin: 0 }}>
          {recipient.name}
        </p>
      </div>
      <div className={styles.content}>
        {}
        <div className={`${styles.message} ${styles.received}`}>
          Message received
        </div>
        <div className={`${styles.message} ${styles.sent}`}>Message sent</div>
      </div>
      <div className={styles.input}>
        <div className={styles.messageInput}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter message" />
          </Form.Group>
        </div>
        <AppButton className={styles.sendButton} type={"submit"}>
          Send
        </AppButton>
      </div>
    </div>
  );
}

export default MessageBox;
