import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const UserProfile = () => {
    const { userProfile, setUserProfile, axios, token } = useAppContext();
    const [name, setName] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || '');
            setAvatarPreview(userProfile.avatar || '');
        }
    }, [userProfile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!token) return toast.error("You must be logged in to update your profile.");
        
        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (imageFile) {
                formData.append('avatar', imageFile);
            }

            const { data } = await axios.put('/api/user/profile', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            });

            if (data.success) {
                setUserProfile({ name: data.user.name, avatar: data.user.avatar });
                toast.success(data.message);
                setImageFile(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <Helmet>
                <title>My Profile - QuickBlog</title>
            </Helmet>
            <Navbar />
            <div className='max-w-2xl mx-auto px-5 sm:px-10 mt-10 min-h-[60vh]'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Profile</h1>
                
                <div className='bg-white rounded-2xl shadow-md border border-gray-100 p-8'>
                    <form onSubmit={handleSave} className='flex flex-col gap-6'>
                        
                        <div className='flex flex-col items-center gap-4'>
                            <label htmlFor="avatar-upload" className='cursor-pointer group relative'>
                                <img 
                                    src={avatarPreview || assets.profile_icon} 
                                    alt="avatar" 
                                    className='w-32 h-32 rounded-full object-cover border-4 border-gray-100 group-hover:border-primary transition-all shadow-sm'
                                    onError={(e) => e.target.src = assets.profile_icon}
                                />
                                <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <span className='text-white text-sm font-medium'>Change Photo</span>
                                </div>
                            </label>
                            <input 
                                type="file" 
                                id="avatar-upload" 
                                className='hidden' 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Display Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all'
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className='w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center'
                        >
                            {isSaving ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
