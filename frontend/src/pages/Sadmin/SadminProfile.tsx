import { useState, useEffect } from "react";
import Loading from "../Loading";
import { CiLogout } from "react-icons/ci";
import { FaAlignJustify } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";

type UserProfile = {
  email: string;
  name: string;
};

const AdminProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState<boolean | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = localStorage.getItem("UserData");
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        } else {
          const res = await axios.get("http://localhost:4000/sadmin/profile", {
            headers: { Authorization: localStorage.getItem("Authorization") },
          });
          setProfile(res.data.userData);
          localStorage.setItem("UserData", JSON.stringify(res.data.userData));
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    const fetchRegistrationStatus = async () => {
      try {
        const res = await axios.get("http://localhost:4000/sadmin/registration-open", {
          headers: { Authorization: localStorage.getItem("Authorization") },
        });
        setRegistrationOpen(res.data.registrationOpen);
        setSelectedStatus(res.data.registrationOpen);
      } catch (error) {
        console.error("Error fetching registration status:", error);
      }
    };

    fetchProfile();
    fetchRegistrationStatus();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Authorization");
    window.location.href = "/";
  };

  const updateRegistrationStatus = async () => {
    setIsUpdating(true);
    try {
      const res = await axios.put(
        "http://localhost:4000/sadmin/registration-open",
        { registrationOpen: selectedStatus },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      setRegistrationOpen(selectedStatus);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update registration status");
    } finally {
      setIsUpdating(false);
    }
  };

  const Sidebar = () => (
    <div className="w-full md:w-64 bg-zinc-900 shadow-md shadow-red-500/50 p-6 rounded-lg h-full flex flex-col">
      <div>
        <h2 className="text-xl font-semibold text-red-500 mb-6">
          Hello, {profile?.name || "N/A"}
        </h2>
      </div>
      <nav>
        <ul className="space-y-3">
          <li
            className="p-2 flex items-center gap-2 rounded cursor-pointer transition hover:text-red-500 hover:font-bold"
            onClick={handleLogOut}
          >
            <CiLogout className="text-xl" /> Logout
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Top Navbar for Mobile */}
      <div className="md:hidden flex items-center justify-between bg-zinc-950 p-4 shadow-md shadow-red-500/20">
        <h1 className="text-xl font-bold text-red-500">Admin</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          {isMobileMenuOpen ? (
            <IoClose size={28} />
          ) : (
            <FaAlignJustify size={24} />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-64 p-4 h-full">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="block md:hidden w-full p-4 absolute z-50 bg-black">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="h-full bg-zinc-900 rounded-md shadow-md shadow-red-500/50 p-6 flex flex-col justify-start">
            {profile ? (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h1 className="text-red-500 text-2xl font-semibold mb-6 border-b border-red-500 pb-2">
                    Personal Information
                  </h1>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h2 className="text-lg font-semibold">Name</h2>
                      <p className="text-gray-400">{profile?.name || "N/A"}</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h2 className="text-lg font-semibold">Email Address</h2>
                      <p className="text-gray-400">{profile?.email || "N/A"}</p>
                    </div>
                  </div>

                  <h2 className="text-red-500 text-xl font-semibold mt-10 mb-4 border-b border-red-500 pb-2">
                    Registration Control
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium">Current Status:</p>
                      <p
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          registrationOpen
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {registrationOpen ? "Open" : "Closed"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <label className="text-md">Change Status:</label>
                      <select
                        value={selectedStatus ? "open" : "closed"}
                        onChange={(e) =>
                          setSelectedStatus(e.target.value === "open")
                        }
                        className="p-2 bg-zinc-800 border border-red-500 rounded-md text-white"
                      >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button
                        onClick={updateRegistrationStatus}
                        disabled={isUpdating}
                        className={`bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded text-white font-semibold ${
                          isUpdating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isUpdating ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
