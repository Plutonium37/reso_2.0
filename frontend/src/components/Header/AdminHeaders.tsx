import { Link as RouterLink} from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const AdminHeader = () => {
  
  return (
    <nav className="fixed top-0 left-0 w-full p-4 pr-7 shadow  border-b border-red-500 z-50 bg-zinc-900">
      <div className="text-white flex justify-between items-center">
        <RouterLink
          to="/admin/event"
          className={`mr-5 transition duration-300 hover:text-red-400 ${
            location.pathname === "/admin/event"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Event
        </RouterLink>
        <RouterLink
          to="/admin/profile"
          className={`transition duration-300 hover:text-red-400 ${
            location.pathname === "/profile"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          <CgProfile className="size-7" />
        </RouterLink>
      </div>
    </nav>
  );
};

export default AdminHeader;