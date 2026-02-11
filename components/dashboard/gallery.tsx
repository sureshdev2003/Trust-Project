"use client";

import { useState } from "react";

export default function GallerySection() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.title || !formData.image) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image!);

    const res = await fetch("/api/gallery", {
      method: "POST",
      body: data,
    });

    setLoading(false);

    if (res.ok) {
      alert("Gallery item uploaded successfully!");
      setFormData({ title: "", description: "", image: null });
      setPreview(null);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Add Gallery Item</h1>
        <p className="text-muted-foreground">Upload image with details</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-xl shadow border space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Image Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full border p-2 rounded-md"
          required
        />

        <textarea
          placeholder="Enter Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded-md"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-md border"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Save Gallery Item"}
        </button>
      </form>
    </div>
  );
}
