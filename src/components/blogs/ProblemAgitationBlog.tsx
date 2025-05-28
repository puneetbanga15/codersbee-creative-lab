import React from "react";

const ProblemAgitationBlog = () => (
  <article className="prose md:prose-lg max-w-3xl mx-auto py-12 px-4">
    <header>
      <h1 className="text-4xl font-bold text-codersbee-vivid mb-4">Is Your Child’s Coding Education Future-Proof?</h1>
      <p className="text-xl text-gray-700 mb-8">Why parents need to rethink coding for the AI era—and how to truly prepare kids for tomorrow’s world.</p>
    </header>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">The Problem: Coding Isn’t Enough Anymore</h2>
      <ul className="list-disc ml-6 text-gray-800 mb-4">
        <li>Most schools and platforms teach coding as a set of rules and syntax, not as a tool for real-world problem-solving.</li>
        <li>AI is rapidly transforming every industry—kids need to understand, build, and collaborate with AI, not just write code.</li>
        <li>Future jobs will require creativity, adaptability, and the ability to work with intelligent systems.</li>
      </ul>
      <p>Traditional coding classes alone won’t equip children for these changes. Parents must look beyond “just coding.”</p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">What Today’s Kids Really Need</h2>
      <ul className="list-disc ml-6 text-gray-800 mb-4">
        <li><strong>AI-First Mindset:</strong> Understanding how AI works, and how to use it as a creative partner.</li>
        <li><strong>Project-Based Learning:</strong> Building real apps, games, and AI projects—not just solving textbook problems.</li>
        <li><strong>Critical Thinking:</strong> Tackling open-ended challenges, not just following instructions.</li>
        <li><strong>Collaboration:</strong> Working with peers, mentors, and even AI assistants.</li>
      </ul>
      <p>These skills empower children to become creators, not just consumers, in the digital world.</p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">How CodersBee Makes a Difference</h2>
      <ul className="list-disc ml-6 text-gray-800 mb-4">
        <li>Personalized, 1:1 mentorship and live sessions.</li>
        <li>AI-powered projects and hands-on labs.</li>
        <li>Real-world challenges, not just rote learning.</li>
        <li>Continuous updates to curriculum—always ahead of the curve.</li>
      </ul>
      <p className="mb-4">At CodersBee, we’re not just teaching coding—we’re preparing your child to thrive in a world shaped by AI and rapid innovation.</p>
      <a href="/enroll" className="inline-block bg-codersbee-vivid text-white px-6 py-3 rounded-lg shadow-md hover:bg-codersbee-vivid/90 transition-colors duration-300 font-semibold">See How We Teach &rarr;</a>
    </section>
    <footer className="mt-12 border-t pt-8 text-center text-gray-500">
      <p>Want to learn more? Explore our <a href="/blogs" className="text-codersbee-vivid hover:underline">blog</a> or <a href="/enroll" className="text-codersbee-vivid hover:underline">book a free trial</a> for your child today.</p>
    </footer>
  </article>
);

export default ProblemAgitationBlog;
