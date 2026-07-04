import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';

const Bookmarks = () => {
    const { blogs, bookmarks } = useAppContext();
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

    useEffect(() => {
        if (blogs.length > 0) {
            const filtered = blogs.filter(blog => bookmarks.includes(blog._id));
            setBookmarkedBlogs(filtered);
        }
    }, [blogs, bookmarks]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-5 sm:px-10 mt-10 min-h-[60vh] mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Bookmarks</h1>
                
                {bookmarkedBlogs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center mt-20 text-gray-500'>
                        <p className='text-xl'>You haven't bookmarked any blogs yet.</p>
                        <p className='mt-2'>Go explore and save some of your favorites!</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap gap-8'>
                        {bookmarkedBlogs.map((item, index) => (
                            <BlogCard 
                                key={index}
                                blog={item}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Bookmarks;
