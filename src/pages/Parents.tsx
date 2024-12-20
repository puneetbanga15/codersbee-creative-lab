import React from 'react';
import { Navbar } from "@/components/Navbar";

const Parents = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Parent's Corner</h1>
          <p className="text-gray-600">Welcome to the Parent's Corner. Please log in to access your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Parents;