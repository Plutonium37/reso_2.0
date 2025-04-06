import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Header/AdminHeaders.tsx";
const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <main className="pt-16 bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Admin