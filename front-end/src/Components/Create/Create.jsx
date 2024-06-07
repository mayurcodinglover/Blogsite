import React, { useState } from 'react';
import upload from '../../assets/upload.jpeg'
import { json } from 'react-router-dom';
import { useEffect } from 'react';

const Create = ({editable}) => {
  const id=localStorage.getItem("blogid");
  
  const [blogimage, setblogImage] = useState(upload);
  const [publish, setpublish] = useState("Publish")
  const [form, setform] = useState({
    title:"",
    description:"",
    blogimage:"",
    category:""
  })

  const handlechange=(e)=>{
      setform({...form,[e.target.name]:e.target.value})
  }
  const handleblogimg=(e)=>{
        setblogImage(e.target.files[0]);
  }

  const handlePublish = async () => {
    // Logic to publish the blog
    console.log('Blog published!');
    // console.log(form);

    let responsedata;
    let blogdata=form;

    const formdata=new FormData();
    formdata.append("blogimg",blogimage)
    
    await fetch("http://localhost:3000/uploadblogimg",{
      method:"POST",
      body:formdata
    }).then((res)=>res.json()).then((data)=>responsedata=data)

    if(responsedata.success)
      {
        blogdata.blogimage=responsedata.image_url;
        console.log(blogdata);

        await fetch("http://localhost:3000/createblog",{
          method:"POST",
          headers:{
            Accept:"application/form-data",
            'auth-token':`${localStorage.getItem('auth-token')}`,
            "Content-Type":"application/json",
          },
          body:JSON.stringify(blogdata)
        }).then((res)=>res.json()).then((data)=>data.success?alert("blog inserted successfully")
        :alert("Blog not inserted due to some error"));
        
        setform({
          title:"",
          blogimage:"",
          description:"",
        })
      }
    
  };
  useEffect(() => {
    if (editable) {
      setpublish("Update"); // Set the publish state asynchronously in useEffect
    }
  }, [editable]);

  const handlePublishupdate=async()=>{
    let responsedata;
    const data=form;

    const formdata=new FormData()
    formdata.append("blogimg",blogimage);

    await fetch("http://localhost:3000/uploadblogimg",{
      method:"POST",
      body:formdata
    }).then((res)=>res.json()).then((data)=>responsedata=data);
    data.blogimage=responsedata.image_url;
    console.log(data);

    await fetch(`http://localhost:3000/updateblog/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data)
    }).then((res)=>res.json()).then((data)=>{
      if(data.success)
        {
          alert("blog updated successfully");
          window.location.href="/"
        }
        else{
          alert("something went wrong");
        }
    });
  }

  return (
    <div className="max-w-[80%] mx-auto mt-8">
      
        <label htmlFor="blog-img" className='h-[20rem] w-[100%] flex justify-center items-center'>
        <img src={blogimage===upload?upload:URL.createObjectURL(blogimage)} alt="Blog" className="max-w-full  mb-4 "  />
        </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleblogimg}
        id="blog-img"
        name="blogimg"
        className="mb-4"
        hidden
      />
      <select name="category" id="category" onChange={handlechange}>
          <option value="Technology">Technology</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
      </select>
      <input
        type="text"
        placeholder="Enter title"
        value={form.title}
        name="title"
        onChange={handlechange}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />
      <textarea
        placeholder="Enter description"
        value={form.description}
        name='description'
        onChange={handlechange}
        className="border border-gray-300 p-2 rounded mb-4 w-full h-40"
      />
      {publish==="Publish"?<button
        onClick={handlePublish}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {publish}
      </button>:<button
        onClick={handlePublishupdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {publish}
      </button>}
    </div>
  );
};

export default Create;
