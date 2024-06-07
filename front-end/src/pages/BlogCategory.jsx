import React, { useContext } from 'react'
import data from '../assets/data'
import Card from '../Components/Card/Card'
import test from '../assets/test.jpg'
import { BlogContext } from '../Components/Context/Context'

const BlogCategory = ({category}) => {
const {allblogsdata}=useContext(BlogContext);
  return (
    <div>
      {allblogsdata.map((item,index)=>{
        if(item.category===category)
        {
          return (<Card id={item.blogid} imageUrl={item.blogimg} title={item.blogtitle} description={item.blogdesc.length>100?item.blogdesc.substring(0,100)+"...":item.blogdesc}/>)
          
        }
      })}
    </div>
  )
}

export default BlogCategory
