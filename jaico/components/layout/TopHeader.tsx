import React from "react";
import { Search, MapPin, Globe, User, Menu, ChevronDown, Package } from "lucide-react";

export function TopHeader() {
  return (
    <header className="w-full bg-slate-900 text-white h-[64px] flex items-center px-4 md:px-6 justify-between border-b border-slate-800">
      {/* Brand & Location */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Package className="w-6 h-6 text-teal-400" />
          <span className="text-xl font-bold tracking-tight">Jaico-Mart</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1 hover:bg-slate-800 px-3 py-1.5 rounded-md cursor-pointer transition-colors text-sm text-slate-300">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>Chennai</span>
          <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
        </div>
      </div>

      {/* Primary Global Search */}
      <div className="flex-1 max-w-2xl px-6 hidden lg:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-800 text-slate-300 placeholder-slate-400 focus:outline-none focus:bg-white focus:text-slate-900 focus:border-teal-500 sm:text-sm transition-colors"
            placeholder="Search products, services, suppliers, or specify your intent..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors">
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center space-x-2 md:space-x-4 text-sm">
        <div className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-teal-400 transition-colors px-2 py-1">
          <Globe className="w-4 h-4" />
          <span>EN</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        
        <div className="flex items-center space-x-2 cursor-pointer bg-teal-600 hover:bg-teal-500 text-white px-4 py-1.5 rounded-md transition-colors font-medium">
          <span>Post Requirement</span>
        </div>

        <div className="flex items-center space-x-1 cursor-pointer hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors text-slate-300">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Sign In</span>
        </div>
        
        <button className="p-2 hover:bg-slate-800 rounded-md lg:hidden">
          <Search className="w-5 h-5 text-slate-300" />
        </button>
        <button className="p-2 hover:bg-slate-800 rounded-md md:hidden">
          <Menu className="w-5 h-5 text-slate-300" />
        </button>
      </div>
    </header>
  );
}
