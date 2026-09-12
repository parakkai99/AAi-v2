import { JiLinkAd, JiLinkCategory } from "../types";

export const CATEGORIES: JiLinkCategory[] = [
  { id: "real-estate", name: "Real Estate", icon: "Home" },
  { id: "vehicles", name: "Vehicles", icon: "Car" },
  { id: "services", name: "Services", icon: "Wrench" },
  { id: "electronics", name: "Electronics", icon: "Smartphone" },
  { id: "jobs", name: "Jobs", icon: "Briefcase" },
];

export const INITIAL_ADS: JiLinkAd[] = [
  {
    id: "ad-1",
    title: "Modern 2BHK Apartment",
    description: "Spacious 2BHK located in the city center with all modern amenities.",
    category: "real-estate",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: "MG Road, Bangalore"
    },
    price: "$1,200/mo",
    createdAt: new Date().toISOString()
  },
  {
    id: "ad-2",
    title: "Used Sedan in Great Condition",
    description: "2019 model, single owner, fully serviced.",
    category: "vehicles",
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop",
    location: {
      lat: 13.0827,
      lng: 80.2707,
      address: "Anna Nagar, Chennai"
    },
    price: "$15,000",
    createdAt: new Date().toISOString()
  },
  {
    id: "ad-3",
    title: "Professional Plumbing Services",
    description: "Available 24/7 for all your plumbing needs.",
    category: "services",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    location: {
      lat: 11.0168,
      lng: 76.9558,
      address: "RS Puram, Coimbatore"
    },
    contact: "555-0192",
    createdAt: new Date().toISOString()
  }
];
