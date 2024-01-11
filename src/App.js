import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<AppLayout />} />
          <Route path="/app/:id" element={<BookDetails />} />

          <Route path="*" element="PAGE NOT FOUND" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
