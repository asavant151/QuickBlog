import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import DeleteModal from "../../components/admin/DeleteModal";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const {axios} = useAppContext();

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs');
      if(data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const { data } = await axios.post("/api/blog/delete/", { id });
      if (data.success) {
        toast.success(data.message);
        setDeleteId(null);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  onDeleteClick={(id) => setDeleteId(id)}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteBlog(deleteId)}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default ListBlog;
