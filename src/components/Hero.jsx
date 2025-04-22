import { motion as Motion } from "framer-motion";

export const Hero = ({ onExploreClick }) => {
  return (
    <Motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* Profile Image */}
        <div className="w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="/images/am.jpg" // Put profile.jpg in your public folder
            alt="Ugbedah Amos"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Tagline */}
        <h1 className="text-5xl font-bold mb-4 dark:text-white">Hi, I’m Amos</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          I build amazing web experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExploreClick}
            className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 transition-all"
          >
            Explore My Work
          </Motion.button>

          <a
            href="/Ugbedah_Amos_Resume.pdf"
            download
            className="px-6 py-2 text-lg font-semibold text-blue-600 dark:text-purple-400 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:underline transition-all"
          >
            Download CV
          </a>
        </div>
      </Motion.div>
    </Motion.section>
  );
};
