import Toast from "react-bootstrap/Toast";
import { useState } from "react";

function Guide({ message }) {
  const [guideOpened, setGuideOpened] = useState(true);

  return (
    <div>
      {guideOpened && (
        <Toast
          animation
          bg="warning"
          onClick={() => setGuideOpened(!guideOpened)}
        >
          <Toast.Header>
            <strong className="me-auto">Guide</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      )}
    </div>
  );
}
export default Guide;
