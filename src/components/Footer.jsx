import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter, FaArrowUp, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Name & Rights */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-1">Ugbedah Amos</h2>
          <p className="text-sm text-gray-400">Frontend Developer & Tech Enthusiast</p>
          <p className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Contact Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/amos-ugbedah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/amos-ugbedah-rhim-lhim-lhio-b3096322a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/share/NiNAAhyPF7m9Py8E/?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/UgbedahA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/ugbedah_amos_?igsh=MWoyemhjcXE4b2YzNQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:ugbedahamos@gmail.com"
            className="text-gray-300 hover:text-[#c7ae6a] text-xl"
          >
            <MdEmail />
          </a>
        </div>

        {/* Back to top */}
        <div className="flex justify-center md:justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-[#c7ae6a] text-black px-4 py-2 rounded-lg hover:bg-[#b99a45] transition"
          >
            <FaArrowUp />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
