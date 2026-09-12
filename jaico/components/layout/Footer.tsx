import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-8 px-4 md:px-6 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-slate-300">Jaico-Mart</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-teal-400 transition-colors">About Us</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
