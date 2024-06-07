import React from "react";
import mylogo from '../../assets/mylogo.jpg'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/"><img src={mylogo} alt="Logo" className="w-10 h-10 mr-2" /></Link>
        <h1 className="text-lg font-semibold">My Blog</h1>
      </div>

      {/* Categories */}
      <nav className="space-x-4">
        <Link to="/Technology" className="hover:text-gray-300">Technology</Link>
        <Link to="/Travel" className="hover:text-gray-300">Travel</Link>
        <Link to="/Food" className="hover:text-gray-300">Food</Link>
        {/* Add more categories as needed */}
      </nav>

      {/* Login Button */}
      {(localStorage.getItem("auth-token"))?<Link to="/login"><button onClick={()=>{localStorage.removeItem("auth-token");window.location.replace("/")}} type="submit" className='bg-green-700 mx-2 px-5 py-2 rounded-lg bg-transparent border-2 font-bold'>Logout</button></Link>:<Link to="/login"><button type="submit" className='bg-green-700 mx-2 px-5 py-2 rounded-lg bg-transparent border-2 font-bold'>Login</button></Link>}
    </header>
  );
};

export default Navbar;
