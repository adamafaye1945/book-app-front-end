import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import BookDetails from "./components/BookDetails";
import Tracker from "./pages/Tracker";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app">
            <Route path="search" element={<AppLayout />} />
            <Route path="search/:id" element={<BookDetails />} />
            <Route path="tracker" element={<Tracker />} />
          </Route>

          <Route path="*" element="PAGE NOT FOUND" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
