import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/blogs/BlogList";

const Blogs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-codersbee-dark">Insights & Stories</h1>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore our collection of thought-provoking articles, parent guides, and stories about coding, AI, and creative learning for kids.
          </p>
          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
