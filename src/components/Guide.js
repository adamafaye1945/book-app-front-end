import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import AppButton from "./AppButton";

function Guide({ message }) {
  const [guideOpened, setGuideOpened] = useState(false);

  return (
    <div>
      {guideOpened ?  (
        <Toast
          animation = {true}
          bg="warning"
          show={guideOpened}
          onClick={()=>setGuideOpened(!guideOpened)}
        >
          <Toast.Header>
            <strong className="me-auto">Guide</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      ) : <AppButton type="details" action={()=>setGuideOpened(!guideOpened)}>Guide</AppButton>}
    </div>
  );
}
export default Guide;
