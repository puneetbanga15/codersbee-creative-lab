import React from "react";
import Link from "next/link";

const blogs = [
  {
    title: "Why Kids Struggle to Learn Coding (And How We Help)",
    slug: "problem-agitation",
    description: "Explore the real challenges kids face in learning to code and how our approach makes a difference.",
  },
  {
    title: "How We're Innovating in Coding Education",
    slug: "innovation-highlight",
    description: "Discover our unique methods and tools that set us apart in teaching coding and AI to kids.",
  },
  {
    title: "Success Stories: Real Kids, Real Results",
    slug: "success-stories",
    description: "Be inspired by real stories of students who have thrived with CodersBee.",
  },
  {
    title: "Student Showcase: Amazing Projects by Our Learners",
    slug: "student-showcase",
    description: "See some of the incredible projects created by our talented young coders.",
  }
];

export const BlogList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {blogs.map(blog => (
      <div key={blog.slug} className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.description}</p>
        <Link href={`/blogs/${blog.slug}`} legacyBehavior>
          <a className="text-codersbee-vivid font-bold hover:underline">Read More →</a>
        </Link>
      </div>
    ))}
  </div>
);
