import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const UserRegister = () => {
    const { axios, setToken, setRole, setUserProfile } = useAppContext();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/register', { name, email, password });
            if (data.success) {
                setToken(data.token);
                setRole(data.user.role);
                setUserProfile({ name: data.user.name, avatar: data.user.avatar });
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.user.role);
                axios.defaults.headers.common["Authorization"] = data.token;
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <Helmet>
        <title>Register - QuickBlog</title>
      </Helmet>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-2xl'>
        <div className='flex justify-center mb-8'>
            <img src={assets.logo} alt="logo" className='w-32' />
        </div>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Create an Account</h2>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe"
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all'
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="you@example.com"
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all'
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Create a password"
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all'
                />
            </div>
            <button type="submit" className='w-full py-2.5 mt-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium'>
                Sign Up
            </button>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600'>
            Already have an account? <Link to="/login" className='text-primary hover:underline font-medium'>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default UserRegister
