import React from "react";
import { Grid, Building2, Wrench, Briefcase, Tag, Target } from "lucide-react";

export function MarketplaceHeader() {
  const categories = [
    { name: "All Categories", icon: <Grid className="w-4 h-4 mr-1.5" /> },
    { name: "Products", icon: <PackageIcon className="w-4 h-4 mr-1.5" /> },
    { name: "Services", icon: <Wrench className="w-4 h-4 mr-1.5" /> },
    { name: "Suppliers", icon: <Briefcase className="w-4 h-4 mr-1.5" /> },
    { name: "Businesses", icon: <Building2 className="w-4 h-4 mr-1.5" /> },
    { name: "Offers", icon: <Tag className="w-4 h-4 mr-1.5" /> },
    { name: "Near Me", icon: <Target className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 h-[48px] hidden md:flex items-center px-4 md:px-6 overflow-x-auto hide-scrollbar">
      <nav className="flex space-x-1 min-w-max">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              index === 0
                ? "text-teal-700 bg-teal-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}
