import { useState, useEffect } from "react";

const images = [
  { src: "/reso2025.png", title: "Tech Revolution" },
  { src: "/reo.png", title: "Innovators Meet" },
  { src: "/resoOrange.png", title: "Future of Technology" },
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white px-6 py-16 flex flex-col items-center justify-center">
      <h1
        className="font-extrabold text-5xl md:text-6xl text-white tracking-widest mb-6 text-center"
        style={{
          WebkitTextStroke: "1px #ff6347",
        }}
      >
        EVENTS
      </h1>

      <h2 className="text-3xl text-red-400 font-semibold mb-6">
        {images[currentIndex].title}
      </h2>

      <div className="relative w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto border-4 border-red-500 rounded-lg overflow-hidden">
        <div className="relative h-[450px] md:h-[500px] flex items-center justify-center bg-black">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-900 p-3 rounded-full hover:bg-red-500 transition"
        >
          <img
            src="/Icon/less.svg"
            alt="Previous"
            className="w-6 h-6 hover:filter brightness-75"
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-900 p-3 rounded-full hover:bg-red-500 transition"
        >
          <img
            src="/Icon/greater.svg"
            alt="Next"
            className="w-6 h-6 hover:filter brightness-75"
          />
        </button>
      </div>

      <div className="flex space-x-3 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3.5 h-3.5 rounded-full ${
              index === currentIndex ? "bg-red-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;