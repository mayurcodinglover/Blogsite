import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 p-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p>&copy; 2024 Your Blog. All rights reserved.</p>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
