import { useState } from "react";
import { supabase } from "../../services/supabaseClient";

export const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title || !description || !link || !image) {
      setError("All fields are required.");
      return;
    }
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!cloudinaryRes.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const cloudinaryData = await cloudinaryRes.json();

      // Save project to Supabase
      const { error } = await supabase.from("projects").insert([
        {
          title,
          description,
          link,
          image_url: cloudinaryData.secure_url,
        },
      ]);

      if (error) {
        throw new Error("Failed to save project in Supabase.");
      }

      alert("Project added successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

      {error && (
        <div className="mb-4 text-red-500 p-3 rounded bg-red-100 dark:bg-red-900">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Project Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        className={`w-full p-2 text-white rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Adding Project..." : "Add Project"}
      </button>
    </form>
  );
};
