import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element ="PAGE NOT FOUND"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
