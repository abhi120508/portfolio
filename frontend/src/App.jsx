// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
