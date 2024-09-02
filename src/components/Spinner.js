import { Spinner } from "react-bootstrap";

function AppSpinner() {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        marginTop: "50px",
        marginBottom:"50px"
      }}
    >
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
    </div>
  );
}

export default AppSpinner;
