import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Loginsignup = () => {
  const [status, setstatus] = useState("Signup")
  const [profilePicture, setProfilePicture] = useState(false);
  const [form, setform] = useState({
    name:"",
    email:"",
    password:"",
    profimage:""
  })

  const handleSignUp = async() => {
    console.log("signup called");
    console.log(form);
    let responsedata;
    const userdata=form;

    const formData=new FormData();
    console.log(profilePicture.name);
    formData.append('profimg',profilePicture)
    console.log(formData);

    await fetch("http://localhost:3000/uploadprofile",{
      method:"POST",
      body:formData
    }).then((res)=>res.json()).then((data)=>{responsedata=data})
    if(responsedata.success)
      {
        userdata.profimage=responsedata.image_url;
        console.log(userdata);

        await fetch("http://localhost:3000/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(userdata)
        }).then((res)=>res.json()).then((data)=>{
          data.success?alert("signup completed"):alert("failed")
          setform({
              name:"",
              email:"",
              password:"",
              profimage:null
          })
        })
      }

  };

  const handleimage=(e)=>{
    setProfilePicture(e.target.files[0])
}
  const handlelogin=async()=>{
    console.log("sign in called");
    console.log(form);
    let responsedata;

    const formData=new FormData();

    await fetch("http://localhost:3000/login",{
      method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
      body:JSON.stringify(form)
    }).then((res)=>res.json()).then((data)=>responsedata=data);
    if(responsedata.success)
      {
        localStorage.setItem("auth-token",responsedata.token)
        window.location.replace("/");
      }
      else{
        alert(responsedata.error);
      }
  }

  const handlechange=(e)=>{
      setform({...form,[e.target.name]:e.target.value})
  }

  // useEffect(() => {
  //     setform((prevform)=>({
  //       ...prevform,
  //       profimage:profilePicture
  //     }))
  // }, [profilePicture])
  
  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-lg bg-gray-800 text-white my-3">
      <h2 className="text-2xl font-bold mb-4">{status}</h2>
      {status==="Signup"?
      <>
      <div className="mb-4 flex justify-center items-center flex-col">
      <label htmlFor="file-input">
                    <img src={profilePicture?URL.createObjectURL(profilePicture):"null"} alt="" className="h-20 w-20 rounded-full bg-white m-2 p-1"/>
                </label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 "
          id="file-input"
          onChange={handleimage}
          name="image"
          hidden
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full text-black"
          value={form.name}
          name="name"
          onChange={(e)=>{handlechange(e)}}
        />
      </div>
      </>:<></>}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="border p-2 w-full text-black"
          name="email"
          onChange={(e)=>{handlechange(e)}}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          
          className="border p-2 w-full text-black"
          name="password"
          onChange={(e)=>{handlechange(e)}}
        />
      </div>
      <div className="mb-4">
        <button
          onClick={status==="Signup"?handleSignUp:handlelogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {status}
        </button>
      </div>
      <div className="mb-4">
        {status==="Signup"?<label>
          Already have an account? Click to <Link to="/login" onClick={()=>setstatus("Login")}>login</Link>.
        </label>:<label>
          Don't have an account? Click to <Link to="/login" onClick={()=>setstatus("Signup")}>Sign up</Link>.
        </label>}
        {
          

        }
        
        
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          onChange={(e) => setRememberPassword(e.target.checked)}
          className="mr-2"
        />
        <label>Remember Password</label>
      </div>
    </div>
  );
};

export default Loginsignup;
