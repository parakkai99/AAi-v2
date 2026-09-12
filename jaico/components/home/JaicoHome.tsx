import React from "react";
import { JaicoHero } from "./hero/JaicoHero";

export function JaicoHome() {
  return (
    <div className="flex flex-col w-full h-full bg-slate-50">
      <section className="w-full">
        <JaicoHero />
      </section>

      <section className="w-full max-w-7xl mx-auto py-12 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore the Marketplace</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex flex-col items-center justify-center aspect-square hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-3">
                <div className="w-6 h-6 border-2 border-current rounded-sm"></div>
              </div>
              <span className="text-sm font-medium text-slate-700 text-center">Category {i + 1}</span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="w-full bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Suppliers Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-teal-400 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Premium Supplier {i + 1}</h3>
                    <p className="text-sm text-slate-500 mt-1">Industrial Equipment & Tools</p>
                    <div className="flex items-center space-x-2 mt-3 text-sm">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">Verified</span>
                      <span className="text-slate-500">2.4 km away</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button className="text-teal-600 text-sm font-medium hover:text-teal-700">View Profile</button>
                  <button className="bg-teal-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-teal-700">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
