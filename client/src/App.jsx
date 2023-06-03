import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/Private/PrivateRoute";
import AdminRoute from "./components/Private/Admin";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/DashBoard";
import { getUser } from "./helper/SessionHelper";

const user = getUser();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
