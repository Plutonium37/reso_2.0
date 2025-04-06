import { useState, useEffect } from "react";
import Loading from "./Loading";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import EventRegistered from "./EventRegistered";
import { FaAlignJustify } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

type UserProfile = {
  email: string;
  name: string;
  image?: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEventsRegister, setShowEventsRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = localStorage.getItem("UserData");
        if (storedProfile) {
          const profileParsed = JSON.parse(storedProfile);
          setProfile(profileParsed);
          return;
        }

        const respond = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        setProfile(respond.data.userData);
        localStorage.setItem("UserData", JSON.stringify(respond.data.userData));
      } catch (error) {}
    };
    fetchProfile();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Authorization");
    window.location.href = "/";
  };

  const Sidebar = () => (
    <div className="w-full md:w-64 bg-zinc-900 shadow-md shadow-red-500/50 p-6 rounded-lg h-full flex flex-col justify-start">
      <div className="flex  text-left mb-6">
        <h2 className="text-xl font-semibold text-red-500">
          Hello, {profile?.name || "N/A"}
        </h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-3">
          <li className="text-red-400 text-lg font-bold">My Profile</li>
          <li
            className={`p-2 rounded cursor-pointer transition ${
              !showEventsRegister ? "bg-red-600" : "hover:bg-red-500/30"
            }`}
            onClick={() => {
              setShowEventsRegister(false);
              setIsMobileMenuOpen(false);
            }}
          >
            Profile Information
          </li>
          <li
            className={`p-2 rounded cursor-pointer transition ${
              showEventsRegister ? "bg-red-600" : "hover:bg-red-500/30"
            }`}
            onClick={() => {
              setShowEventsRegister(true);
              setIsMobileMenuOpen(false);
            }}
          >
            Events Registered
          </li>
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
        <h1 className="text-xl font-bold text-red-500">My Profile</h1>
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
              showEventsRegister ? (
                <EventRegistered />
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h1 className="text-red-500 text-2xl font-semibold mb-6 border-b border-red-500 pb-2">
                      Personal Information
                    </h1>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <h2 className="text-lg font-semibold">Name</h2>
                        <p className="text-gray-400">
                          {profile?.name || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <h2 className="text-lg font-semibold">Email Address</h2>
                        <p className="text-gray-400">
                          {profile?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
