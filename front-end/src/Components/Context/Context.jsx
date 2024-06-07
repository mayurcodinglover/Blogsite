import React, { createContext, useState, useEffect } from "react";

export const BlogContext = createContext(null);

const BlogContextProvider = (props) => {
    const [allblogsdata, setallblogsdata] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allblogs")
            .then((res) => res.json())
            .then((data) => setallblogsdata(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    console.log("from context", allblogsdata);

    const contextValue = { allblogsdata };

    return (
        <BlogContext.Provider value={contextValue}>
            {props.children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
