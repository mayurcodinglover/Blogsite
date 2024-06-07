import React from 'react';
import { Link } from 'react-router-dom';

const CreateBlogbutton = ({ onCreate }) => {
  return (
    <div className="max-w-[80%] mx-auto mt-8">
    {localStorage.getItem("auth-token") ? <Link to="/createblog"> <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={onCreate}
      >
        Create New Blog
      </button>
      </Link>:<Link to="/login"> <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={onCreate}
      >
        Create New Blog
      </button>
      </Link>}
    </div>
  );
};

export default CreateBlogbutton;
