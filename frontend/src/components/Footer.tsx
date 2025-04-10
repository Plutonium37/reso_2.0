import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black border-t-3 border-red-500 p-5">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-white">
            <FaPhone className="w-5 h-5 md:w-6 md:h-6 " />
            <span className="text-sm md:text-base">+91 7005702324</span>
          </div>
          <div className="flex items-center gap-2  text-white ">
            <FaEnvelope className="w-5 h-5 md:w-6 md:h-6 " />
            <span className="text-sm md:text-base">reso.mittakyel@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <h1 className="text-white text-lg md:text-xl font-extrabold tracking-widest">
            R E S O 2 0 2 5
          </h1>

          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/share/15nkz9vfZ5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-red-500" />
            </a>

            <a
              href="https://www.instagram.com/reso_mit_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-red-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-white text-center mt-4 border-t border-red-300 pt-2 text-xs md:text-sm">
        Copyright © 2025 RESO. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;