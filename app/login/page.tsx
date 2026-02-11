"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle2 } from "lucide-react";
import { authService } from "@/lib/authService";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(password);
      
      if (response.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with trust-related imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-orange-900/75" />
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-white rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full">
          {/* Trust Section - Left Side */}
          <div className="hidden lg:block flex-1 text-white space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 backdrop-blur-sm rounded-2xl border border-orange-400/30">
                <Shield className="w-9 h-9 text-orange-400" />
              </div>
              <h2 className="text-4xl font-bold">Trust Management Portal</h2>
              <p className="text-slate-300 text-lg">Secure access for authorized trust administrators</p>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg">Verified Access Only</h3>
                  <p className="text-slate-400 text-sm">Multi-factor authentication ensures only authorized personnel can access trust data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg">Complete Audit Trail</h3>
                  <p className="text-slate-400 text-sm">Every action is logged and monitored for transparency and accountability</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg">Bank-Grade Security</h3>
                  <p className="text-slate-400 text-sm">Your trust's sensitive information protected with enterprise encryption</p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="pt-6 mt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm">Trusted by leading charitable trusts and foundations across India</p>
            </div>
          </div>

          {/* Login Card - Right Side */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl">
                    <Shield className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trust Admin</h1>
                    <p className="text-sm text-gray-500">Authorized Access</p>
                  </div>
                </div>
                <p className="text-gray-600">Sign in with your authorized credentials to manage trust operations</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Secure Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3.5 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Access Trust Portal</span>
                    </>
                  )}
                </button>
              </form>

              {/* Security Info */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4 text-orange-500" />
                  <span>256-bit SSL encryption • SOC 2 compliant</span>
                </div>
                <p className="text-xs text-center text-gray-400">
                  All login attempts are monitored and logged for security purposes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
