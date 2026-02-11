"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NewsInputFormProps {
  onSuccess?: () => void;
}

export default function NewsInputForm({ onSuccess }: NewsInputFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    imagePreview: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Cleanup blob URLs on component unmount
  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clean up previous blob URL to prevent memory leaks
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.image) {
        setError("Please fill in all fields and select an image");
        return;
      }

      // Upload image first
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json();
        throw new Error(uploadError.error || "Failed to upload image");
      }

      const { imageUrl } = await uploadResponse.json();
      console.log("Uploaded image URL:", imageUrl); // Debug log

      // Validate that we got a proper URL, not a blob
      if (!imageUrl || imageUrl.startsWith('blob:')) {
        throw new Error("Invalid image URL received from upload");
      }

      // Create news article
      const newsResponse = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.description,
          imageUrl,
        }),
      });

      if (!newsResponse.ok) {
        const newsError = await newsResponse.json();
        throw new Error(newsError.error || "Failed to create news article");
      }

      // Clean up blob URL before resetting
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: null,
        imagePreview: "",
      });

      // Call success callback
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Add Latest News
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Input */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-foreground"
          >
            Image
          </label>
          <div className="relative border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {formData.imagePreview ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={formData.imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-48 rounded-md object-cover"
                />
                <p className="text-sm text-muted-foreground">
                  Click to change image
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm font-medium text-foreground">
                  Click to upload image
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter news title"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter news description"
            rows={5}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create News Article"}
        </Button>
      </form>
    </div>
  );
}
