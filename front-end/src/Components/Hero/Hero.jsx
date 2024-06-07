import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-800 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-8">
          Explore the latest articles on various topics.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded">
          Explore Articles
        </button>
      </div>
    </section>
  );
};

export default Hero;
