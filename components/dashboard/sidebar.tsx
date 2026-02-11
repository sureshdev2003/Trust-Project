"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GalleryHorizontal,
  HandFist,
  Handshake,
  Menu,
  Newspaper,
  X,
  HandHeart,
  LogOut,
} from "lucide-react";
import { authService } from "@/lib/authService";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  // { id: "banner", label: "Banner", icon: "🎨" },
  { id: "latest-news", label: "Latest News", icon: Newspaper },
  { id: "impact", label: "Impact", icon: HandFist },
  { id: "sponsors", label: "Sponsors", icon: Handshake },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontal },
  { id: "donors", label: "Donors", icon: HandHeart },
  { id: "certificates", label: "Certificates", icon: LogOut },
];

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 transition-transform duration-300 z-40 w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                TrustHub
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <span className="text-xl">{<item.icon />}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
          <div className="text-xs text-sidebar-foreground/60 text-center mt-4">
            <p>© 2025 TrustHub</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
