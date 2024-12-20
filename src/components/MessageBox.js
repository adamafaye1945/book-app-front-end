import { CloseButton, Form } from "react-bootstrap";
import AppButton from "./AppButton";
import styles from "./message.module.css";
import { useAppContext } from "../context/Context";
import { useMemo, useState } from "react";
import { useAuthContext } from "../context/authentification";
function ReceivedText({ message }) {
  return (
    <div className={`${styles.message} ${styles.received}`}>{message}</div>
  );
}
function SentText({ message }) {
  return <div className={`${styles.message} ${styles.sent}`}>{message}</div>;
}
function MessageBox({ recipient }) {
  const { user } = useAuthContext();
  const { send_message, message, setfriend_messageDisplay } = useAppContext();
  function closeMessageBox() {
    setfriend_messageDisplay(true);
  }
  const sortedMessage = useMemo(() => {
    return message.sort(
      (mess1, mess2) => mess1.timestamp.seconds - mess2.timestamp.seconds
    );
  }, [message]);
  
  const [messages, setMessages] = useState("");
  async function send() {
    if (messages != "") {
      await send_message(messages, recipient.userid);
      setMessages("");
    }
  }
  return (
    <div
      style={{
        marginTop: "40px",
        backgroundColor: "#f9efdb",
      }}
    >
      <div className={styles.chatContainer}>
        <div className={styles.header}>
          <div style={{ display: "flex" }}>
            <div className={styles.photo}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={"../image.webp"}
                alt={`${recipient.name}'s avatar`}
              />
            </div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "10px",
              }}
            >
              {recipient.name}
            </p>
          </div>
          <div style={{ marginRight: "10px" }}>
            <CloseButton onClick={closeMessageBox}/>
          </div>
        </div>
        <div className={styles.content}>
          {sortedMessage.map((mess) =>
            mess.sender_id === user.details.id ? (
              <SentText message={mess.message} />
            ) : (
              <ReceivedText message={mess.message} />
            )
          )}
        </div>
        <div className={styles.input}>
          <div className={styles.messageInput}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter message"
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
              />
            </Form.Group>
          </div>
          <AppButton
            className={styles.sendButton}
            type={"submit"}
            action={send}
          >
            Send
          </AppButton>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
