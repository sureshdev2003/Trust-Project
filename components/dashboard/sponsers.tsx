"use client";

import { useState } from "react";
import SponsorsManagement from "./sponsors";
import SponsorInputForm from "./sponsor-input-form";

export default function SponsorsSection() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSponsorAdded = () => {
    // Trigger refresh of sponsors list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Sponsors Management
        </h1>
        <p className="text-muted-foreground">
          Manage sponsor logos and information for the website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Sponsor Form */}
        <div>
          <SponsorInputForm onSponsorAdded={handleSponsorAdded} />
        </div>

        {/* Existing Sponsors Management */}
        <div>
          <SponsorsManagement key={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
