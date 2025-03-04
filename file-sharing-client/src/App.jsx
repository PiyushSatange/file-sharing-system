import toast, { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectFromUnauthenticatedUser from "./Routes/ProtectFromUnauthenticatedUser";
import ProtectFromAuthenticatedUser from "./Routes/protectFromAuthenticatedUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectFromUnauthenticatedUser>
              <Home />
            </ProtectFromUnauthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectFromAuthenticatedUser>
              <Login />
            </ProtectFromAuthenticatedUser>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectFromAuthenticatedUser>
              <Register />
            </ProtectFromAuthenticatedUser>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectFromUnauthenticatedUser>
              <Dashboard />
            </ProtectFromUnauthenticatedUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
