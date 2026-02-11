"use client";

import { useEffect, useState } from "react";

interface Certificate {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function CertificateSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch certificates
  const loadCertificates = async () => {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    if (data.success) {
      setCertificates(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !photo) {
      alert("Title and Photo are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", photo);

    const res = await fetch("/api/certificates", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Certificate added successfully!");
      setTitle("");
      setDescription("");
      setPhoto(null);
      loadCertificates(); // refresh certificates
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* Upload Form */}
      <div className="w-full max-w-xl bg-white p-6 shadow rounded-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Certificate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Certificate Title"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Upload Photo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full cursor-pointer"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Submit Certificate
          </button>
        </form>
      </div>

      {/* Certificate Display Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Uploaded Certificates</h1>

        {loading ? (
          <p>Loading...</p>
        ) : certificates.length === 0 ? (
          <p className="text-gray-500">No certificates uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-3 bg-white"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover rounded"
                />

                <h2 className="mt-3 text-lg font-semibold">{cert.title}</h2>

                {cert.description && (
                  <p className="text-gray-600 text-sm mt-2">{cert.description}</p>
                )}

                <p className="text-xs text-gray-400 mt-3">
                  {new Date(cert.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
