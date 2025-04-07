import { Link as RouterLink} from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const SuperAdminHeader = () => {
  
  return (
    <nav className="fixed top-0 left-0 w-full p-4 pr-7 shadow flex justify-between border-b border-red-500 z-50 bg-zinc-900">
      <div className="text-white flex items-center">
      <RouterLink
          to="/superadmin/create-admin-event"
          className={`mr-5 transition duration-300 hover:text-red-400 ${
            location.pathname === "/superadmin/create-admin-event"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Create
        </RouterLink>
        <RouterLink
          to="/superadmin/details-event-admin"
          className={`mr-5 transition duration-300 hover:text-red-400 ${
            location.pathname === "/superadmin/details-event-admin"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Admin
        </RouterLink>
        <RouterLink
          to="/superadmin/event-user"
          className={`mr-5 transition duration-300 hover:text-red-400 ${
            location.pathname === "/superadmin/event-user"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Edit
        </RouterLink>
        <RouterLink
          to="/superadmin/profile"
          className={`transition duration-300 hover:text-red-400 ${
            location.pathname === "/superadmin/profile"
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

export default SuperAdminHeader;