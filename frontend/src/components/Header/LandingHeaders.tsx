import { scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (section: "home" | "event" | "about") => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });

      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 50);
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  const sections: Array<"home" | "event" | "about"> = [
    "home",
    "event",
    "about",
  ];
  return (
    <nav className="fixed top-2% left-2% w-full p-4 pr-7 shadow flex justify-between border-b border-red-500 z-50 bg-zinc-900">
      <div className="text-white ">
        <h1 className="text-4xl">RESO</h1>
      </div>
      <div className="text-white flex  items-center">
        {sections.map((section) => (
          <span
            key={section}
            className={`ml-7 cursor-pointer transition duration-300 hover:text-red-400 ${
              location.pathname === "/" && activeSection === section
                ? "text-red-400 font-bold "
                : location.pathname !== "/"
                ? "text-white"
                : ""
            }`}
            onClick={() => handleNavClick(section)} 
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        ))}
      </div>
      <div className="text-white flex items-center">
      <button className="relative inline-block px-8 py-3 font-semibold tracking-wider text-white transition-all duration-300 ease-out border border-cyan-400 rounded-full group hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:border-cyan-300 overflow-hidden">
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-300 blur-sm"></span>
  <span className="relative z-10"><RouterLink
          to="/signup"
          className={`transition duration-300 hover:text-red-400 ${
            location.pathname === "/signup"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Register
        </RouterLink></span>
</button>

      
      </div>
    </nav>
  );
};

export default LandingHeader;
