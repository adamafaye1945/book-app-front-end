import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ContextProvider } from "./context/Context";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import BookDetails from "./components/BookDetails";
import Tracker from "./pages/Tracker";
import { useAuthContext } from "./context/authentification";
import FriendList from "./components/FriendListComponent";
import FriendPage from "./pages/FriendPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { user } = useAuthContext();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user.authenticated && (
            <Route path="/app">
              <Route path="search" element={<AppLayout />} />
              <Route path="search/:id" element={<BookDetails />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="friends" element={<FriendPage />}></Route>
            </Route>
          )}

          <Route
            path="*"
            element="PAGE NOT FOUND OR UNAUTHORIZED ACCESS TO THE PAGE"
          />
        </Routes>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
