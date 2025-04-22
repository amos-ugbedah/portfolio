import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("projects").select("*");
        if (error) {
          setError("Failed to fetch projects.");
          console.error("Supabase Error:", error.message);
        } else {
          setProjects(data);
        }
      } catch (err) {
        console.error("Unexpected Error:", err.message);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl font-bold dark:text-white">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl font-bold text-red-500 dark:text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
            >
              {/* Display project image */}
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="mb-4 rounded-lg max-h-60 object-cover w-full"
                />
              ) : (
                <div className="mb-4 rounded-lg bg-gray-200 dark:bg-gray-600 h-60 flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Image Available
                </div>
              )}

              {/* Display project details */}
              <h3 className="text-xl font-semibold dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>

              {/* Buttons Row */}
              <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:justify-between sm:items-center">
                {/* GitHub button */}
                {project.GitHub && (
                  <a
                    href={project.GitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-center bg-gray-700 text-white rounded hover:bg-gray-900 transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
                  >
                    View on GitHub
                  </a>
                )}

                {/* Vercel button */}
                {project.Vercel && (
                  <a
                    href={project.Vercel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 transition dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    View Live on Vercel
                  </a>
                )}
              </div>

              {/* External project link (optional) */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
