const Home = () => {
    return (
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white min-h-screen overflow-hidden">


{/* SVG Gears */}
<div className="absolute inset-0 -z-10">
  <svg
    className="absolute top-10 left-10 w-32 h-32 text-blue-600 opacity-20 animate-spin-slow"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M11.3 1.046a1 1 0 00-2.6 0l-.2.46..." />
  </svg>

  <svg
    className="absolute bottom-10 right-10 w-48 h-48 text-teal-400 opacity-10 animate-spin-slow"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M11.3 1.046a1 1 0 00-2.6 0l-.2.46..." />
  </svg>
</div>

{/* Hero Content */}
<div className="flex flex-col items-center justify-center text-center h-screen px-4">
  <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
   RESO 2025
  </h1>
  <p className="mt-6 text-lg text-gray-300 max-w-xl">
    Dive into innovation, creativity, and cutting-edge technology with us. Experience workshops, exhibitions, and competitions like never before!
  </p>
</div>
</div>
    );
  };
  
  export default Home;