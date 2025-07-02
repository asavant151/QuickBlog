import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react"
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blogs, input} = useAppContext();

  const filteredBlogs = () => {
    if(input === '') {
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <div className="flex justify-normal md:justify-center gap-4 pt-3 sm:gap-8 my-10 relative z-3 overflow-x-auto">
        {blogCategories.map((category, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => setMenu(category)}
              className={`cursor-pointer text-gray-500 ${
                menu === category && "text-white px-4 pt-0.5"
              }`}
            >
              {category}
              {menu === category  && (
                <motion.div
                layoutId="underline"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'
              ></motion.div>
              )}
              
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
