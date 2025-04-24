// src/components/Skills.jsx
export const Skills = () => {
  const skills = [
    "React",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "REST API Integration",
    "Git & GitHub",
    "Postman",
    "Supabase",
    "Health Information Systems",
    "Data Entry & Analysis",
    "Responsive Web Design",
    "UI/UX Improvement",
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900" id="skills">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          My Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          I specialize in front-end web development, API integration, and
          digital health solutions. Here are the tools and technologies I use:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white dark:bg-gray-800 shadow-md text-sm text-gray-800 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
