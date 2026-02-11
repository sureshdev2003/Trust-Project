"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Heart, Mail, CreditCard, FileText, X } from "lucide-react";
import Image from "next/image";

export default function DonationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [panCard, setPanCard] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Clean up previous blob URL
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !amount.trim() ||
      !panCard.trim() ||
      !transactionId.trim() ||
      !selectedFile
    ) {
      setError("Please fill in all fields and upload transaction proof");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid donation amount");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload transaction proof first
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload transaction proof");
      }

      const uploadData = await uploadResponse.json();

      // Create donation record
      const donationResponse = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          amount: amount.trim(),
          panCard: panCard.trim(),
          transactionId: transactionId.trim(),
          proofImageUrl: uploadData.imageUrl,
        }),
      });

      if (!donationResponse.ok) {
        const errorData = await donationResponse.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to submit donation (${donationResponse.status})`
        );
      }

      // Reset form
      setFullName("");
      setEmail("");
      setAmount("");
      setPanCard("");
      setTransactionId("");
      removeImage();
      setSuccess(
        "Donation submitted successfully! We will verify your donation and send you a confirmation email."
      );

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error("Error submitting donation:", err);

      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Network error: Unable to connect to server. Please check your internet connection."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while submitting your donation");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Donation Details</h2>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-orange-200 rounded-lg 
  focus:ring-2 focus:ring-orange-500 focus:border-transparent 
  transition-colors text-gray-900 placeholder-gray-400"
              placeholder="Full Name (As on PAN Card)"
              required
            />
          </div>

          {/* Email */}
          <div>
  <label
    htmlFor="email"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Email
  </label>
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full pl-16 pr-4 py-3 border border-orange-200 rounded-lg
      focus:ring-2 focus:ring-orange-500 focus:border-transparent
      text-gray-900 placeholder-gray-400"
      placeholder="example@gmail.com"
      required
    />
  </div>
</div>


          {/* Donation Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Donation Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 font-semibold">
                ₹
              </span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-orange-200 rounded-lg 
  focus:ring-2 focus:ring-orange-500 focus:border-transparent 
  transition-colors text-gray-900 placeholder-gray-400"
                placeholder="0.00"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* PAN Card Number */}
          <div>
            <label
              htmlFor="panCard"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PAN Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="panCard"
                value={panCard}
                onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-3 border border-orange-200 rounded-lg 
  focus:ring-2 focus:ring-orange-500 focus:border-transparent 
  transition-colors text-gray-900 placeholder-gray-400"
                placeholder="ABCDE1234F"
                maxLength={10}
                required
              />
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Transaction ID
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-orange-200 rounded-lg 
  focus:ring-2 focus:ring-orange-500 focus:border-transparent 
  transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Enter UPI transaction ID"
                required
              />
            </div>
          </div>

          {/* Transaction Proof Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Proof
            </label>

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 transition-colors bg-orange-50/50"
              >
                <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">Upload Screenshot</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-orange-200">
                  <Image
                    src={previewUrl}
                    alt="Transaction Proof"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white py-4 px-6 rounded-lg hover:from-orange-700 hover:via-orange-600 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            {isSubmitting ? "Submitting Donation..." : "Confirm Donation"}
          </button>
        </form>
      </div>
    </div>
  );
}
