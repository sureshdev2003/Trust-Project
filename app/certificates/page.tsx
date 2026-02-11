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
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For fullscreen modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then(async (res) => {
        try {
          const data = await res.json();
          if (data.success) setCertificates(data.data);
        } catch (err) {
          setError("Failed to load certificates.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Server error while fetching certificates.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading certificates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Certificates</h1>

      {certificates.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No certificates uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="border rounded-xl shadow-lg hover:shadow-2xl transition p-5 bg-white"
            >
              <img
                src={cert.image.startsWith("/") ? cert.image : "/" + cert.image}
                alt={cert.title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(cert.image.startsWith("/") ? cert.image : "/" + cert.image)}
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
              />

              <h2 className="mt-4 text-2xl font-semibold">{cert.title}</h2>

              {cert.description && (
                <p className="text-gray-700 text-base mt-2">{cert.description}</p>
              )}

              <p className="text-sm text-gray-400 mt-3">
                {new Date(cert.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Screen"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
