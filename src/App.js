import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element="PAGE NOT FOUND" />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
