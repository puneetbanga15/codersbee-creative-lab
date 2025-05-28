import React from "react";
import { StudentShowcase } from "@/components/enroll/StudentShowcase";

const StudentShowcaseBlog = () => (
  <article className="prose mx-auto py-8">
    <h1 className="text-3xl font-bold mb-4">Student Showcase: Amazing Projects by Our Learners</h1>
    <StudentShowcase />
  </article>
);

export default StudentShowcaseBlog;
