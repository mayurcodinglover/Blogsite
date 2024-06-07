import React, { useContext } from 'react';
import Hero from '../Components/Hero/Hero';
import Heading from '../Components/Heading/Heading';
import Card from '../Components/Card/Card';
import test from '../assets/test.jpg';
import Footer from '../Components/Footer/Footer';
import CreateBlog from '../Components/Createblog/Createblogbutton';
import { BlogContext } from '../Components/Context/Context';

const Home = ({ category }) => {
  const { allblogsdata } = useContext(BlogContext);

  if (!allblogsdata) {
    return <div>Loading...</div>; // or any loading indicator
  }
  return (
    <div>
      <Hero />
      <CreateBlog />
      <Heading />
      {allblogsdata.map((item, index) => (
        <Card
          key={item.blogid} // added key prop for optimization
          id={item.blogid}
          imageUrl={item.blogimg}
          title={item.blogtitle}
          description={
            item.blogdesc.length > 100
              ? item.blogdesc.substring(0, 100) + '...'
              : item.blogdesc
          }
        />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
