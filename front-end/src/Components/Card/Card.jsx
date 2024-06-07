import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id,imageUrl, title, description }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl my-4" >
      <div className="md:flex">
        <div kye={id} className="md:flex-shrink-0">
          <Link to={`/showblog/${id}`}><img className="h-48 w-full object-cover md:w-48" src={imageUrl} alt="Blog" /></Link>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
