import { Link as RouterLink} from "react-router-dom";
const About = () => {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white px-6 py-16 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
          About RESO 2025
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          <span className="text-cyan-400 font-semibold">RESO</span> is the annual technical festival of Manipur Institute of Technology, bringing together innovation, creativity, and technology in a spectacular fusion of talent and brilliance.
          From cutting-edge workshops and thought-provoking talks to high-energy hackathons and interactive exhibitions, TechNova is a celebration of engineering and problem-solving.
        </p>

        <p className="text-lg text-gray-400">
          Our mission is to inspire young minds, foster collaboration, and push the boundaries of what's possible. With over <span className="text-blue-400 font-medium">5000+</span> participants, <span className="text-blue-400 font-medium">30+ events</span>, and a lineup of industry experts, this year's edition promises to be bigger and better than ever.
        </p>

        <div className="mt-8">
          <a
            href="/register"
            className="inline-block px-8 py-3 font-semibold tracking-wider text-white border border-cyan-400 rounded-full group hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:border-cyan-300 transition-all duration-300 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-sm transition duration-300"></span>
            <span className="relative z-10"><RouterLink
          to="/signup"
          className={`transition duration-300 hover:text-red-400 ${
            location.pathname === "/signup"
              ? "text-red-400 font-bold "
              : "text-white"
          }`}
        >
          Register Now
        </RouterLink></span>
          </a>
        </div>
      </div>
    </section>
    );
  };
  export default About;