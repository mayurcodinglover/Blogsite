import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Create from '../../Components/Create/Create';

const Blogdisplay = ({ image, title, description, comments,userid }) => {
  const { blogid } = useParams();
  localStorage.setItem("blogid",blogid);
  
  const [edit, setEdit] = useState(false);
  const [uid, setuid] = useState(null)
  const [newComment, setNewComment] = useState({
    userid: "",
    blogid: blogid,
    content: ""
  });
  const [prevComments, setPrevComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${blogid}/comments`)
      .then((res) => res.json())
      .then((data) => setPrevComments(data));
    fetch("http://localhost:3000/fetchuserid",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("auth-token")
      }
    })
    .then((res)=>res.json()).then((data)=>setuid(data.userid))
  }, [blogid]);

  console.log("user id fetched is :",uid);
  console.log("blog user id :",userid);

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleAddComment = async () => {
    await fetch("http://localhost:3000/addcomment", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        'auth-token': `${localStorage.getItem('auth-token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment)
    })
      .then((res) => res.json())
      .then((data) =>
        data.success ? alert("comment posted") : alert("Failed")
      );
    setNewComment("");

    fetch(`http://localhost:3000/blogs/${blogid}/comments`)
      .then((res) => res.json())
      .then((data) => setPrevComments(data));
  };

  const handleDelete = async () => {
    let responseData;
    await fetch(`http://localhost:3000/blogdelete/${blogid}`)
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      alert("blog is deleted");
      window.location.href = "/";
    } else {
      alert("Blog is not deleted due to some error");
    }
  };

  const handleEdit = async () => {
    setEdit(true);
  };

  return (
    <div className="max-w-[80%] mx-auto shadow-md rounded-lg overflow-hidden w-full my-2">
      {!edit ? (
        <div>
          <img
            className="w-full h-64 object-cover object-center"
            src={image}
            alt={title}
          />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700">{description}</p>
            {/* Add Comment Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Add Comment:</h3>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Your comment"
                  value={newComment.content}
                  onChange={handleChange}
                  name="content"
                  className="border border-gray-300 p-2 rounded mr-2 flex-grow"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            </div>
            {/* Comments Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Comments:</h3>
              {prevComments.map((comment, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img
                    src={comment.userimage}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">{comment.username}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Create editable={edit}/>
      )}




      <div className="flex justify-end mt-4">
      {(localStorage.getItem("auth-token") && uid===userid) ?<><button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button></>:<></>}
        
      </div>
    </div>
  );
};

export default Blogdisplay;
