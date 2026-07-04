import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");
    const [userProfile, setUserProfile] = useState({ name: "", avatar: "" });
    const [bookmarks, setBookmarks] = useState(() => {
        const stored = localStorage.getItem("bookmarks");
        return stored ? JSON.parse(stored) : [];
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBlogs = async (page = 1) => {
        try {
            const {data} = await axios.get(`/api/blog/all?page=${page}&limit=6`);
            if (data.success) {
                if (page === 1) {
                    setBlogs(data.blogs);
                } else {
                    setBlogs(prev => [...prev, ...data.blogs]);
                }
                setCurrentPage(data.currentPage);
                setHasMore(data.currentPage < data.totalPages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get('/api/user/profile');
            if (data.success) {
                setUserProfile({ name: data.user.name, avatar: data.user.avatar });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(token) {
            setToken(token);
            setRole(role);
            axios.defaults.headers.common["Authorization"] = `${token}`;
            if (role === 'user') {
                fetchUserProfile();
            } else if (role === 'admin') {
                setUserProfile({ name: "Admin", avatar: "" });
            }
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const value = {
        axios, navigate, token, setToken, role, setRole, blogs, setBlogs, input, setInput, fetchBlogs, userProfile, setUserProfile, bookmarks, setBookmarks, currentPage, hasMore
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}