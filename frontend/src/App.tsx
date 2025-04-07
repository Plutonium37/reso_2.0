import { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./pages/Loading";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import AdminSignin from "./pages/Admin/AdminSignin";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Landing from "./main/Landing";
import User from "./main/User";
import axios from "axios";
import AdminProfile  from "./pages/Admin/AdminProfile";
import SadminSignin  from "./pages/Sadmin/SadminSignin";
import SadminProfile  from "./pages/Sadmin/SadminProfile";
import SuperAdmin from "./main/Superadmin"
import Admin from "./main/Admin";
interface AuthStatus {
  auth: "USER" | "ADMIN" | "SUPERADMIN";
}

function App() {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AuthStatus = async () => {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        setAuthStatus(null);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:4000/islogIn", {
          headers: {
            Authorization: token,
          },
        });
        setAuthStatus(response.data);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setAuthStatus(null);
      } finally {
        setLoading(false);
      }
    };
    AuthStatus();
  }, []);
  if (loading) return <Loading />;

  const router = createBrowserRouter(
    createRoutesFromElements(
      !authStatus ? (
        <Route path="/" element={<Landing />}>
          <Route index element={<Main />} />
          <Route path="signin" element={<Signin />} />
          <Route path="admin-signin" element={<AdminSignin />} />
          <Route path="sadmin-signin" element={<SadminSignin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : authStatus.auth === "ADMIN" ? (
        <Route path="/" element={<Admin />}>
          <Route path="/admin/event" element={<Register />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : authStatus.auth === "SUPERADMIN" ? (
        <Route path="/" element={<SuperAdmin />}>
          <Route path="/superadmin/event-user" element={<Register />} />
          <Route path="/superadmin/admin-event" element={<Register />} />
          <Route path="/superadmin/event" element={<Register />} />
          <Route path="/superadmin/profile" element={<SadminProfile />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : (
        <Route path="/" element={<User />}>
          <Route index element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Route>
      )
    )
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
