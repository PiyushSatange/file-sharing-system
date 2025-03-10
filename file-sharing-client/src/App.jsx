import toast, { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectFromUnauthenticatedUser from "./Routes/ProtectFromUnauthenticatedUser";
import ProtectFromAuthenticatedUser from "./Routes/protectFromAuthenticatedUser";
import Shared from "./pages/shared";
import Transfer from "./pages/transfer";
import Bin from "./pages/bin";
import Starred from "./pages/starred";
import Upload from "./pages/upload";
import Profile from "./pages/profile";
import DashboardIndex from "./pages/dashboardIndex";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
        >
          <Route index element={<DashboardIndex />} />
          <Route path="files" element={"#"} />
          <Route path="shared" element={<Shared />} />
          <Route path="starred" element={<Starred />} />
          <Route path="upload" element={<Upload />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="bin" element={<Bin />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
