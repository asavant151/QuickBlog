import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, onDeleteClick, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios, fetchBlogs } = useAppContext();

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600 font-medium" : "text-amber-500 font-medium"
          }`}
        >
          {blog.isPublished ? "Published" : "Draft"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {blog.isPrivate ? "Private 🔒" : "Public 🌍"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          onClick={togglePublish}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          alt="cross_icon"
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          onClick={() => onDeleteClick(blog._id)}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
