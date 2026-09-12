import React from "react";
import { ArchitectAnyExperience } from "@/src/experience/ArchitectAnyExperience";
import type { ApplicationContext } from "@/src/applications/ApplicationDefinition";
import { JaicoHome } from "./home/JaicoHome";
import { TopHeader } from "./layout/TopHeader";
import { MarketplaceHeader } from "./layout/MarketplaceHeader";
import { Footer } from "./layout/Footer";

export function JaicoApp({ context }: { context: ApplicationContext }) {
  return (
    <ArchitectAnyExperience
      applicationId="jaico"
      theme="light" // Default to light theme for a marketplace feel
      layout="header-main-footer"
      className="min-h-screen bg-gray-50 font-sans"
    >
      <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
        {/* Unified Global Top Header */}
        <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
          <TopHeader />
          <MarketplaceHeader />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col relative z-10 w-full overflow-x-hidden">
          <JaicoHome />
        </main>
        
        <Footer />
      </div>
    </ArchitectAnyExperience>
  );
}
