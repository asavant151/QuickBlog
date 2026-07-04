import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { navigate, token, setToken, role, setRole, userProfile, setUserProfile, axios } = useAppContext();

    const logoutHandler = () => {
      setToken(null);
      setRole(null);
      setUserProfile({name: "", avatar: ""});
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    }

  return (
    <>
      <div className='flex justify-between items-center py-5 sm:mx-20 xl:mx-32'>
          <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
          
          <div className='flex items-center gap-4 sm:gap-6'>
            <Link to="/bookmarks" className='font-medium text-gray-700 hover:text-primary transition-colors'>Bookmarks</Link>
            
            {token ? (
              <>
                <Link to="/profile" className='flex items-center gap-2 group cursor-pointer'>
                    <img src={userProfile?.avatar || assets.profile_icon} alt="profile" className='w-8 h-8 rounded-full object-cover border border-gray-200 group-hover:border-primary transition-colors' onError={(e) => e.target.src = assets.profile_icon} />
                    <span className='hidden sm:block text-sm font-medium text-gray-700 group-hover:text-primary transition-colors'>{userProfile?.name || "User"}</span>
                </Link>
                {role === 'admin' && (
                  <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2.5' onClick={() => navigate('/admin')}>
                    Dashboard <img src={assets.arrow} alt="arrow" className='w-3' />
                  </button> 
                )}
                <button onClick={logoutHandler} className='font-medium text-gray-700 hover:text-red-500 transition-colors'>Logout</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5'>
                Login
              </button>
            )}
          </div>
      </div>
    </>
  )
}

export default Navbar
