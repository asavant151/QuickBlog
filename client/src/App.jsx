import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import ListBlog from './pages/admin/ListBlog'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from "react-hot-toast";
import { useAppContext } from './context/AppContext';
import BestSellers from './pages/BestSellers';
import ContactPage from './pages/ContactPage';
import Faqs from './pages/Faqs';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Messages from './pages/admin/Messages';
import Subscribers from './pages/admin/Subscribers';
import Bookmarks from './pages/Bookmarks';
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserProfile from "./pages/UserProfile";

const App = () => {

  const {token} = useAppContext();

  return (
    <div className='px-6 md:px-8'>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/bestSellers" element={<BestSellers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/terms-of-service' element={<TermsOfService/>} />
        <Route path='/bookmarks' element={<Bookmarks/>} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="subscribers" element={<Subscribers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
