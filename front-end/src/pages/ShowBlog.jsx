import React from 'react'
import Blogdisplay from '../Components/Blogdisplay/Blogdisplay'
import { useParams } from 'react-router-dom'
import data from '../assets/data'
import test from '../assets/test.jpg'
import { BlogContext } from '../Components/Context/Context'
import { useContext } from 'react'

const ShowBlog = () => {
  const {allblogsdata}=useContext(BlogContext)
  const {blogid}=useParams();
  return (
    <div>
        {allblogsdata.map((item,index)=>{
          if(item.blogid===Number(blogid))
          {
            return <Blogdisplay id={index} image={item.blogimg} title={item.blogtitle} description={item.blogdesc} comments={item.comments} userid={item.userid}/>
          }
        })}
    </div>
  )
}

export default ShowBlog
