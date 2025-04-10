import { Link as RouterLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 text-white flex justify-center items-center">
      <div>
        <div>
          <p> <strong>Ohh! </strong>We are not able to find the page for the given Url</p>
        </div>
        <div className="flex justify-center items-center mt-3">
          <a
            href="/"
            className="inline-block px-8 py-3 font-semibold tracking-wider text-white border border-cyan-400 rounded-sm group hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:border-cyan-300 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">
              <RouterLink
                to="/"
                className={`transition duration-300 hover:text-red-400 ${
                  location.pathname === "/"
                    ? "text-red-400 font-bold "
                    : "text-white"
                }`}
              >
                Return To Home
              </RouterLink>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
