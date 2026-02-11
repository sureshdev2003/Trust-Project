"use client";

import DashboardContent from "@/components/dashboard/dashcontent";
import Sidebar from "@/components/dashboard/sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useState } from "react";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("latest-news");

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <DashboardContent activeSection={activeSection} />
      </div>
    </ProtectedRoute>
  );
}
