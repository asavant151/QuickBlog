import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";
import DeleteModal from "../../components/admin/DeleteModal";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // track subscriber to delete
  const { axios } = useAppContext();

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("/api/admin/subscribers");
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSubscriber = async (id) => {
    try {
      const { data } = await axios.post("/api/admin/delete-subscriber", { id });
      if (data.success) {
        toast.success(data.message);
        setDeleteId(null);
        fetchSubscribers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-y-auto h-full">
      <div className="flex justify-between items-center max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <span className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-semibold">
          Total: {subscribers.length}
        </span>
      </div>
      
      <div className="relative mt-6 max-w-4xl overflow-x-auto shadow rounded-xl bg-white border border-gray-100 mb-8">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">Email ID</th>
              <th scope="col" className="px-6 py-4 max-sm:hidden">Subscribed Date</th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((sub) => {
                const dateFormatted = moment(sub.createdAt).format("Do MMMM YYYY, h:mm a");
                return (
                  <tr key={sub._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-800">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4 max-sm:hidden whitespace-nowrap text-xs text-gray-500">
                      {dateFormatted}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => setDeleteId(sub._id)}
                        className="inline-flex p-2 hover:bg-red-50 rounded-lg group transition-colors cursor-pointer"
                      >
                        <img 
                          src={assets.bin_icon} 
                          alt="delete" 
                          className="w-5 hover:scale-105 transition-transform" 
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteSubscriber(deleteId)}
        title="Delete Subscriber"
        message="Are you sure you want to delete this subscriber? This action cannot be undone."
      />
    </div>
  );
};

export default Subscribers;
