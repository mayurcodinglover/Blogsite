import { useState } from 'react'
import './App.css'
import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ShowBlog from './pages/ShowBlog'
import BlogCategory from './pages/BlogCategory'
import Createblogpage from './pages/Createblogpage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/Technology' element={<BlogCategory category="Technology"/>}></Route>
        <Route path='/Travel' element={<BlogCategory category="Travel"/>}></Route>
        <Route path='/Food' element={<BlogCategory category="Food"/>}></Route>
        <Route path='/showblog' element={<ShowBlog/>}>
          <Route path=':blogid' element={<ShowBlog/>}></Route>
      </Route>
      <Route path='/createblog' element={<Createblogpage/>}></Route>
      </Routes> 
    </> 
  )
}

export default App
