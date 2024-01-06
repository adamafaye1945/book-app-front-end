import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element="PAGE NOT FOUND" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
