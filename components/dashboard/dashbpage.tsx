"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import DashboardContent from "@/components/dashboard/dashcontent";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("banner");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
}
