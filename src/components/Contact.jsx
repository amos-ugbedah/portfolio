import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Whether you have a project idea, want to collaborate, or just want to say hi — feel free to reach out!
        </p>

        <div className="flex flex-col gap-4 items-center text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <a href="mailto:ugbedahamos@gmail.com" className="hover:text-[#c7ae6a]">
              ugbedahamos@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <a href="tel:+2347032287331" className="hover:text-[#c7ae6a]">
              +234 703 228 7331
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Github className="w-5 h-5" />
            <a
              href="https://github.com/amos-ugbedah"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c7ae6a]"
            >
              github.com/amos-ugbedah
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5" />
            <a
              href="https://vercel.com/amos-ugbedahs-projects"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c7ae6a]"
            >
              vercel.com/amos-ugbedahs-projects
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5" />
            <a
              href="https://www.linkedin.com/in/amos-ugbedah-rhim-lhim-lhio-b3096322a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c7ae6a]"
            >
              linkedin.com/in/amos-ugbedah
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
