"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, ExternalLink, Building2 } from "lucide-react";

interface Sponsor {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
  createdAt: string;
}

export default function SponsorsManagement() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sponsors');
      if (!response.ok) {
        throw new Error('Failed to fetch sponsors');
      }
      const data = await response.json();
      setSponsors(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sponsors:', err);
      setError('Failed to load sponsors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) {
      return;
    }

    try {
      const response = await fetch(`/api/sponsors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sponsor');
      }

      setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
    } catch (err) {
      console.error('Error deleting sponsor:', err);
      alert('Failed to delete sponsor');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-orange-600" />
        <h2 className="text-xl font-semibold text-gray-900">Manage Sponsors</h2>
      </div>

      {sponsors.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No sponsors added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video mb-3 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                  unoptimized={sponsor.imageUrl.startsWith('/uploads/')}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.svg';
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {sponsor.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 truncate"
                  >
                    {sponsor.link}
                  </a>
                </div>

                <p className="text-xs text-gray-500">
                  Added: {new Date(sponsor.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleDelete(sponsor.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}